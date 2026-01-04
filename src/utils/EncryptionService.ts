/**
 * 🔐 AES-256-CBC Decryption Service for .NET 8 Backend
 * 
 * This service handles decryption of encrypted API responses from the backend.
 * It strictly matches the .NET backend's encryption implementation.
 * 
 * .NET Backend Logic:
 * - Uses PadOrTruncate(byte[] data, int length) for key processing
 * - If key < 32 bytes: pads with zeros (0x00)
 * - If key > 32 bytes: truncates to 32 bytes
 * - IV (16 bytes) is prepended to ciphertext
 * 
 * Configuration:
 * - Algorithm: AES-256-CBC
 * - Key: Processed to exactly 32 bytes using PadOrTruncate logic
 * - IV: First 16 bytes of Base64 decoded response data
 * - Padding: PKCS7
 */

import CryptoJS from 'crypto-js';
import pako from 'pako';

import { ENV } from '../config/env';

// Secret key from environment
const SECRET_KEY = ENV.RES_KEY;

/**
 * Interface for encrypted response from backend
 */
export interface EncryptedResponse {
  encrypted: true;
  data: string; // Base64 encoded: IV (16 bytes) + Ciphertext
  compressed?: boolean; // Whether data is Gzip compressed (default: true)
}

/**
 * Type guard to check if response is encrypted
 */
export function isEncryptedResponse(data: unknown): data is EncryptedResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'encrypted' in data &&
    (data as EncryptedResponse).encrypted === true &&
    'data' in data &&
    typeof (data as EncryptedResponse).data === 'string'
  );
}

/**
 * Mimics C# PadOrTruncate(byte[] data, int length) function
 * 
 * This function processes a key string to match the exact .NET backend behavior:
 * - Converts string to UTF-8 bytes
 * - Creates a fixed-length byte array (32 bytes for AES-256)
 * - If key is shorter: remaining bytes are filled with 0x00 (zero padding)
 * - If key is longer: truncates to the target length
 * 
 * @param key - The encryption key string
 * @param targetLength - Target byte length (default: 32 for AES-256)
 * @returns CryptoJS WordArray with exactly targetLength bytes
 */
function getZeroPaddedKey(key: string, targetLength: number = 32): CryptoJS.lib.WordArray {
  // Step 1: Convert string to UTF-8 byte array
  // Using TextEncoder for accurate UTF-8 encoding (same as .NET Encoding.UTF8.GetBytes)
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(key);

  // Step 2: Create a new Uint8Array with exact target length (initialized with zeros)
  const paddedKey = new Uint8Array(targetLength);

  // Step 3: Copy key bytes (PadOrTruncate logic)
  // - If keyBytes.length < targetLength: remaining bytes stay as 0x00
  // - If keyBytes.length > targetLength: only first targetLength bytes are copied
  const bytesToCopy = Math.min(keyBytes.length, targetLength);
  for (let i = 0; i < bytesToCopy; i++) {
    paddedKey[i] = keyBytes[i];
  }

  // Step 4: Convert Uint8Array to CryptoJS WordArray
  // CryptoJS uses 32-bit words (4 bytes per word)
  const words: number[] = [];
  for (let i = 0; i < targetLength; i += 4) {
    // Combine 4 bytes into one 32-bit word (big-endian)
    const word =
      ((paddedKey[i] || 0) << 24) |
      ((paddedKey[i + 1] || 0) << 16) |
      ((paddedKey[i + 2] || 0) << 8) |
      (paddedKey[i + 3] || 0);
    words.push(word >>> 0); // Convert to unsigned 32-bit integer
  }

  return CryptoJS.lib.WordArray.create(words, targetLength);
}

/**
 * Mimics C# PadOrTruncate for IV (16 bytes)
 */
function getZeroPaddedIV(iv: string, targetLength: number = 16): CryptoJS.lib.WordArray {
  return getZeroPaddedKey(iv, targetLength);
}

/**
 * Extract IV from encrypted data (first 16 bytes)
 * 
 * @param encryptedData - Full encrypted WordArray (IV + Ciphertext)
 * @returns Object containing IV and Ciphertext as separate WordArrays
 */
function extractIVAndCiphertext(encryptedData: CryptoJS.lib.WordArray): {
  iv: CryptoJS.lib.WordArray;
  ciphertext: CryptoJS.lib.WordArray;
} {
  // Convert WordArray to byte array for precise extraction
  const totalBytes = encryptedData.sigBytes;
  const words = encryptedData.words;

  // Extract all bytes
  const allBytes = new Uint8Array(totalBytes);
  for (let i = 0; i < totalBytes; i++) {
    const wordIndex = Math.floor(i / 4);
    const byteIndex = i % 4;
    allBytes[i] = (words[wordIndex] >>> (24 - byteIndex * 8)) & 0xff;
  }

  // IV is first 16 bytes
  const ivBytes = allBytes.slice(0, 16);

  // Ciphertext is remaining bytes
  const ciphertextBytes = allBytes.slice(16);

  // Convert IV bytes to WordArray
  const ivWords: number[] = [];
  for (let i = 0; i < 16; i += 4) {
    const word =
      ((ivBytes[i] || 0) << 24) |
      ((ivBytes[i + 1] || 0) << 16) |
      ((ivBytes[i + 2] || 0) << 8) |
      (ivBytes[i + 3] || 0);
    ivWords.push(word >>> 0);
  }

  // Convert Ciphertext bytes to WordArray
  const ciphertextWords: number[] = [];
  const ciphertextLength = ciphertextBytes.length;
  for (let i = 0; i < ciphertextLength; i += 4) {
    const word =
      ((ciphertextBytes[i] || 0) << 24) |
      ((ciphertextBytes[i + 1] || 0) << 16) |
      ((ciphertextBytes[i + 2] || 0) << 8) |
      (ciphertextBytes[i + 3] || 0);
    ciphertextWords.push(word >>> 0);
  }

  return {
    iv: CryptoJS.lib.WordArray.create(ivWords, 16),
    ciphertext: CryptoJS.lib.WordArray.create(ciphertextWords, ciphertextLength)
  };
}

/**
 * Encryption Service Class
 * Handles AES-256-CBC decryption matching .NET backend implementation
 */
class EncryptionServiceClass {
  private secretKey: CryptoJS.lib.WordArray;
  private rawKeyString: string;

  constructor() {
    this.rawKeyString = SECRET_KEY;

    // Process key using PadOrTruncate logic (exactly matching .NET backend)
    this.secretKey = getZeroPaddedKey(this.rawKeyString, 32);

    // Debug logging
    if (ENV.IS_DEV) {
      const encoder = new TextEncoder();
      const originalBytes = encoder.encode(this.rawKeyString);
      // console.log('🔐 EncryptionService initialized');
      // console.log(`   Original key string length: ${this.rawKeyString.length} chars`);
      // console.log(`   Original key UTF-8 bytes: ${originalBytes.length} bytes`);
      // console.log(`   Processed key (after PadOrTruncate): ${this.secretKey.sigBytes} bytes`);

      // Log first few bytes for verification (don't log full key in production!)
      const keyHex = this.secretKey.toString(CryptoJS.enc.Hex);
      // console.log(`   Key (first 16 hex chars): ${keyHex.substring(0, 16)}...`);
    }
  }

  /**
   * Decrypt Base64 encoded string from backend
   * 
   * Process (matching .NET backend):
   * 1. Decode Base64 string to bytes
   * 2. Extract IV (first 16 bytes)
   * 3. Extract Ciphertext (remaining bytes)
   * 4. Decrypt using AES-256-CBC with processed key and PKCS7 padding
   * 5. Parse and return JSON object (or string if not valid JSON)
   * 
   * @param encryptedBase64 - Base64 encoded string containing IV + Ciphertext
   * @returns Decrypted data (JSON object or string)
   */
  decrypt<T = unknown>(encryptedBase64: string, isCompressed: boolean = true): T {
    try {
      // Step 1: Decode Base64 string to WordArray
      const encryptedData = CryptoJS.enc.Base64.parse(encryptedBase64);

      if (ENV.IS_DEV) {
        console.log('🔓 Decrypting data...');
        console.log(`   Base64 length: ${encryptedBase64.length} chars`);
        console.log(`   Total encrypted bytes: ${encryptedData.sigBytes}`);
      }

      // Validate minimum length (IV 16 bytes + at least 1 block of ciphertext)
      if (encryptedData.sigBytes < 17) {
        throw new Error(`Encrypted data too short: ${encryptedData.sigBytes} bytes (minimum: 17)`);
      }

      // Step 2 & 3: Extract IV and Ciphertext using byte-accurate extraction
      const { iv, ciphertext } = extractIVAndCiphertext(encryptedData);

      if (ENV.IS_DEV) {
        console.log(`   IV: ${iv.sigBytes} bytes`);
        console.log(`   Ciphertext: ${ciphertext.sigBytes} bytes`);
        console.log(`   Compressed: ${isCompressed}`);
      }

      // Step 4: Create CipherParams object for decryption
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
      });

      // Step 5: Decrypt using AES-256-CBC with processed key
      const decrypted = CryptoJS.AES.decrypt(cipherParams, this.secretKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Step 6: Convert decrypted WordArray to bytes for decompression
      const decryptedWords = decrypted.words;
      const decryptedSigBytes = decrypted.sigBytes;

      if (decryptedSigBytes === 0) {
        // Additional debugging for failed decryption
        if (ENV.IS_DEV) {
          console.error('❌ Decryption produced empty result');
          console.error('   This usually means key/IV mismatch');
        }
        throw new Error('Decryption produced empty result - key/IV mismatch or corrupted data');
      }

      // Convert WordArray to Uint8Array for pako decompression
      const decryptedBytes = new Uint8Array(decryptedSigBytes);
      for (let i = 0; i < decryptedSigBytes; i++) {
        const wordIndex = Math.floor(i / 4);
        const byteIndex = i % 4;
        decryptedBytes[i] = (decryptedWords[wordIndex] >>> (24 - byteIndex * 8)) & 0xff;
      }

      if (ENV.IS_DEV) {
        // console.log('🔓 Decryption successful, now decompressing...');
        // console.log(`   Decrypted bytes: ${decryptedSigBytes}`);
      }

      // Step 7: Decompress if data is compressed, otherwise decode as UTF-8
      let decompressedString: string;

      if (isCompressed) {
        // Gzip Decompress using pako
        try {
          decompressedString = pako.ungzip(decryptedBytes, { to: 'string' });
          if (ENV.IS_DEV) {
            // console.log('✅ Decompression successful');
            // console.log(`   Decompressed string length: ${decompressedString.length} chars`);
          }
        } catch (decompressError) {
          // If decompression fails, maybe data wasn't compressed - try as raw UTF-8
          if (ENV.IS_DEV) {
            // console.log('⚠️ Gzip decompression failed, trying as raw UTF-8...');
          }
          decompressedString = decrypted.toString(CryptoJS.enc.Utf8);

          if (!decompressedString) {
            throw new Error('Data is neither gzip compressed nor valid UTF-8');
          }

          if (ENV.IS_DEV) {
            // console.log('✅ Raw UTF-8 decoding successful (data was not compressed)');
          }
        }
      } else {
        // Data is not compressed, decode as raw UTF-8 directly
        if (ENV.IS_DEV) {
          // console.log('ℹ️ Data is not compressed (compressed: false), decoding as UTF-8...');
        }
        decompressedString = decrypted.toString(CryptoJS.enc.Utf8);

        if (!decompressedString) {
          throw new Error('Failed to decode decrypted data as UTF-8');
        }

        if (ENV.IS_DEV) {
          // console.log('✅ UTF-8 decoding successful (no compression)');
          // console.log(`   String length: ${decompressedString.length} chars`);
        }
      }

      // Step 8: Try to parse as JSON, fallback to raw string
      try {
        const parsedData = JSON.parse(decompressedString);
        return parsedData as T;
      } catch {
        // Not valid JSON, return as string (e.g., for JWT tokens)
        if (ENV.IS_DEV) {
          // console.log('   Response is not JSON, returning as string');
        }
        return decompressedString as T;
      }
    } catch (error) {
      console.error('❌ Decryption failed:', error);
      throw new Error(
        `Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Check if a response object is encrypted
   */
  isEncrypted(data: unknown): data is EncryptedResponse {
    return isEncryptedResponse(data);
  }

  /**
   * Decrypt an encrypted response object
   * Returns original data if not encrypted
   */
  decryptResponse<T = unknown>(responseData: unknown): T {
    if (this.isEncrypted(responseData)) {
      if (ENV.IS_DEV) {
        // console.log('🔐 Encrypted response detected, decrypting...');
        // console.log(`   Compressed: ${responseData.compressed !== false}`);
      }
      // Check if data is compressed (default to true if not specified)
      const isCompressed = responseData.compressed !== false;
      return this.decrypt<T>(responseData.data, isCompressed);
    }
    return responseData as T;
  }

  /**
   * Get the processed key for debugging (only in development)
   * Returns null in production
   */
  getKeyInfo(): { originalLength: number; processedLength: number; keyHexPreview: string } | null {
    if (!ENV.IS_DEV) return null;

    const encoder = new TextEncoder();
    const originalBytes = encoder.encode(this.rawKeyString);

    return {
      originalLength: originalBytes.length,
      processedLength: this.secretKey.sigBytes,
      keyHexPreview: this.secretKey.toString(CryptoJS.enc.Hex).substring(0, 16) + '...'
    };
  }
}

// Lazy-initialized singleton instance to avoid module loading order issues
let encryptionServiceInstance: EncryptionServiceClass | null = null;

/**
 * Get the singleton instance of EncryptionService
 * Uses lazy initialization to avoid module load-time execution
 */
function getEncryptionService(): EncryptionServiceClass {
  if (!encryptionServiceInstance) {
    encryptionServiceInstance = new EncryptionServiceClass();
  }
  return encryptionServiceInstance;
}

// Export the getter function as the main export
export const EncryptionService = new Proxy({} as EncryptionServiceClass, {
  get(_, prop) {
    const instance = getEncryptionService();
    const value = (instance as any)[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});

// Export helper functions for testing
export { getZeroPaddedKey, getZeroPaddedIV, extractIVAndCiphertext };

// Export class for testing/extension  
export { EncryptionServiceClass };

export default EncryptionService;

