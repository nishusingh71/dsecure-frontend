/**
 * Centralized Environment Configuration
 * 
 * Purpose:
 * - Single source of truth for all environment variables
 * - Runtime validation of required variables
 * - Type safety for config values
 * - Removal of direct process.env / import.meta.env usage
 */

import { Download } from "lucide-react";

const validateStr = (value: string | undefined, key: string, required: boolean, fallback: string): string => {
    if (!value && required) {
        throw new Error(`CRITICAL CONFIG ERROR: Missing required environment variable: ${key}`);
    }
    return value || fallback;
};

const validateBool = (value: string | boolean | undefined, defaultVal: boolean): boolean => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return defaultVal;
};

const validateInt = (value: string | undefined, defaultVal: number): number => {
    if (!value) return defaultVal;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultVal : parsed;
};

export const ENV = {
    // Core API
    API_BASE_URL: validateStr(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL', true, ''),
    API_TIMEOUT: validateInt(import.meta.env.VITE_API_TIMEOUT, 60000),

    // Environment
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE,

    // Feature Flags
    ENABLE_ENCRYPTION: validateBool(import.meta.env.VITE_ENABLE_ENCRYPTION, true),
    DEBUG: validateBool(import.meta.env.VITE_DEBUG, import.meta.env.DEV),

    // Analytics
    GA4_ID: validateStr(import.meta.env.VITE_GA4_ID, 'VITE_GA4_ID', false, 'G-6B20XY3K81'),
    CLARITY_ID: validateStr(import.meta.env.VITE_CLARITY_ID, 'VITE_CLARITY_ID', false, 'tkbibktdah'),

    // Third Party
    CLOUDINARY_CLOUD_NAME: validateStr(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, 'VITE_CLOUDINARY_CLOUD_NAME', false, 'D-Secure-tech'),
    RES_KEY: validateStr(import.meta.env.VITE_RES_KEY, 'VITE_RES_KEY', false, '2b8A1Pv0ykhppFD28MV6ResponseKey!'),
    REQ_KEY: validateStr(import.meta.env.VITE_REQ_KEY, 'VITE_REQ_KEY', false, 'YourEncryptionKey32CharactersLong!'),
    ENC_IV: validateStr(import.meta.env.VITE_ENC_IV, 'VITE_ENC_IV', false, '1234567890123456'),
    FILE_ERASER: validateStr(import.meta.env.FileEraser, 'FileEraser', false, 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity='),
    DRIVE_ERASER: validateStr(import.meta.env.DriveEraser, 'DriveEraser', false, 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity='),
    FileEraser_Windows_Download_Link: validateStr(import.meta.env.FileEraser_windows_download_link, 'FileEraser_windows_download_link', false, 'https://downloads.dsecuretech.com/windows/D-SFE_INST_v1_0_0_0.exe'),
    POWER_AUTOMATE_HTTP_URL: validateStr(import.meta.env.POWER_AUTOMATE_HTTP_URL, 'POWER_AUTOMATE_HTTP_URL', false, ''),
};

// Validate critical secrets don't map to defaults in Production if needed
if (ENV.IS_PROD && ENV.API_BASE_URL.includes('localhost')) {
    console.warn('⚠️ WARNING: using localhost API in PRODUCTION mode');
}