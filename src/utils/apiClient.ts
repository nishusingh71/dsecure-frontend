/**
 * 🌐 Axios API Client with AES-256-CBC Decryption Interceptor
 * 
 * Features:
 * - Automatic JWT token injection
 * - Smart response decryption for encrypted payloads
 * - Binary data passthrough (PDF, images, downloads)
 * - Request/Response logging in development
 * 
 * Interceptor Priority Logic:
 * 1. BINARY SAFETY: Skip decryption for binary content types and download URLs
 * 2. ENCRYPTION CHECK: Decrypt if response has { encrypted: true, data: "..." }
 * 3. FALLBACK: Return response as-is
 */

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { EncryptionService, isEncryptedResponse } from './EncryptionService';

// API Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dsecuretech.com';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

/**
 * Binary content types that should NOT be decrypted
 */
const BINARY_CONTENT_TYPES = [
  'application/pdf',
  'application/octet-stream',
  'application/zip',
  'application/x-zip-compressed',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument',
  'image/',
  'audio/',
  'video/',
];

/**
 * URL patterns that indicate binary/download requests
 */
const BINARY_URL_PATTERNS = [
  '/download',
  '/export-pdf',
  '/export',
  '/generate-pdf',
  '/file/',
  '/attachment/',
  '/blob/',
];

/**
 * Check if content type indicates binary data
 */
function isBinaryContentType(contentType: string | undefined): boolean {
  if (!contentType) return false;
  const lowerContentType = contentType.toLowerCase();
  return BINARY_CONTENT_TYPES.some(type => lowerContentType.includes(type));
}

/**
 * Check if URL indicates a binary/download request
 */
function isBinaryUrl(url: string | undefined): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return BINARY_URL_PATTERNS.some(pattern => lowerUrl.includes(pattern));
}

/**
 * Create configured Axios instance
 */
function createApiInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    // Don't transform response automatically - we handle it in interceptor
    transformResponse: [(data) => data],
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // REQUEST INTERCEPTOR - Add JWT Token & Logging
  // ═══════════════════════════════════════════════════════════════════════════
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get JWT token from storage
      const token = sessionStorage.getItem('dsecure:jwt') || 
                    localStorage.getItem('dsecure:jwt') ||
                    localStorage.getItem('jwt_token');

      // Add Authorization header if token exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Development logging
      if (import.meta.env.DEV) {
        console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }

      return config;
    },
    (error) => {
      console.error('❌ Request Interceptor Error:', error);
      return Promise.reject(error);
    }
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // RESPONSE INTERCEPTOR - Smart Decryption Logic
  // ═══════════════════════════════════════════════════════════════════════════
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const contentType = response.headers['content-type'];
      const requestUrl = response.config.url;

      // ─────────────────────────────────────────────────────────────────────────
      // RULE 1: BINARY SAFETY - Skip decryption for binary content
      // ─────────────────────────────────────────────────────────────────────────
      if (isBinaryContentType(contentType) || isBinaryUrl(requestUrl)) {
        if (import.meta.env.DEV) {
          console.log(`📦 Binary response detected, skipping decryption: ${requestUrl}`);
        }
        return response;
      }

      // ─────────────────────────────────────────────────────────────────────────
      // Parse JSON response if it's a string
      // ─────────────────────────────────────────────────────────────────────────
      let responseData = response.data;
      
      // If response data is string, try to parse as JSON
      if (typeof responseData === 'string') {
        try {
          responseData = JSON.parse(responseData);
        } catch {
          // Not JSON, return as-is
          if (import.meta.env.DEV) {
            console.log(`📄 Non-JSON response, returning as-is: ${requestUrl}`);
          }
          return response;
        }
      }

      // ─────────────────────────────────────────────────────────────────────────
      // RULE 2: ENCRYPTION CHECK - Decrypt if encrypted flag is true
      // ─────────────────────────────────────────────────────────────────────────
      if (isEncryptedResponse(responseData)) {
        try {
          if (import.meta.env.DEV) {
            console.log(`🔐 Encrypted response detected: ${requestUrl}`);
          }

          // Decrypt the data
          const decryptedData = EncryptionService.decrypt(responseData.data);
          
          // Replace response data with decrypted data
          response.data = decryptedData;

          if (import.meta.env.DEV) {
            console.log(`✅ Decryption successful: ${requestUrl}`);
            console.log('📥 Decrypted Data:', decryptedData);
          }

          return response;
        } catch (decryptError) {
          console.error(`❌ Decryption failed for ${requestUrl}:`, decryptError);
          
          // Option 1: Throw error (strict mode)
          // throw new Error(`Failed to decrypt response: ${decryptError}`);
          
          // Option 2: Return encrypted data with error flag (graceful degradation)
          response.data = {
            ...responseData,
            decryptionError: true,
            error: decryptError instanceof Error ? decryptError.message : 'Decryption failed',
          };
          return response;
        }
      }

      // ─────────────────────────────────────────────────────────────────────────
      // RULE 3: FALLBACK - Return parsed JSON as-is
      // ─────────────────────────────────────────────────────────────────────────
      response.data = responseData;

      if (import.meta.env.DEV) {
        console.log(`📥 API Response: ${response.config.url}`, response.status);
      }

      return response;
    },
    (error) => {
      // Handle response errors
      if (error.response) {
        const status = error.response.status;
        const url = error.config?.url;

        console.error(`❌ API Error ${status}: ${url}`);

        // Handle 401 Unauthorized - Token expired or invalid
        if (status === 401) {
          console.warn('🔑 Unauthorized - Clearing tokens');
          sessionStorage.removeItem('dsecure:jwt');
          localStorage.removeItem('dsecure:jwt');
          localStorage.removeItem('jwt_token');
          
          // Dispatch custom event for auth handling
          window.dispatchEvent(new CustomEvent('authError', { 
            detail: { status: 401, message: 'Session expired' } 
          }));
        }

        // Try to parse error response
        if (typeof error.response.data === 'string') {
          try {
            error.response.data = JSON.parse(error.response.data);
          } catch {
            // Keep as string
          }
        }
      } else if (error.request) {
        console.error('❌ Network Error - No response received');
      } else {
        console.error('❌ Request Setup Error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT CONFIGURED INSTANCE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Pre-configured Axios instance with encryption interceptor
 * Use this for all API calls to the .NET backend
 */
export const api = createApiInstance();

/**
 * Set JWT token for all future requests
 */
export function setAuthToken(token: string, persist: boolean = false): void {
  sessionStorage.setItem('dsecure:jwt', token);
  if (persist) {
    localStorage.setItem('dsecure:jwt', token);
  }
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('🔑 Auth token set');
}

/**
 * Clear JWT token
 */
export function clearAuthToken(): void {
  sessionStorage.removeItem('dsecure:jwt');
  localStorage.removeItem('dsecure:jwt');
  localStorage.removeItem('jwt_token');
  delete api.defaults.headers.common['Authorization'];
  console.log('🔑 Auth token cleared');
}

/**
 * Get current API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

// Export types
export type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig };

export default api;
