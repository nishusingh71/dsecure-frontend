/**
 * 🔍 Debug Logger Utility
 * 
 * Centralized logging for debugging API calls, encryption, and errors.
 * Logs are always visible in browser console for easier debugging.
 * 
 * Usage:
 *   import { debugLog, debugError, debugWarn } from '@/utils/debugLogger';
 *   debugLog('API', 'Request sent', { url, method });
 *   debugError('API', 'Request failed', error);
 */

import { ENV } from '../config/env';

// Check if debug mode is enabled (always true in dev, or via VITE_DEBUG=true)
const isDebugEnabled = (): boolean => {
    return ENV.DEBUG;
};

// Color codes for different log types
const LOG_COLORS = {
    API: '#4CAF50',      // Green
    AUTH: '#2196F3',     // Blue
    ENCRYPT: '#9C27B0',  // Purple
    ERROR: '#F44336',    // Red
    WARN: '#FF9800',     // Orange
    INFO: '#00BCD4',     // Cyan
};

type LogCategory = keyof typeof LOG_COLORS;

/**
 * Debug log - shows in console with category and color
 */
export const debugLog = (category: LogCategory | string, message: string, data?: any): void => {
    if (!isDebugEnabled()) return;

    const color = LOG_COLORS[category as LogCategory] || '#888888';
    const timestamp = new Date().toLocaleTimeString();

    if (data !== undefined) {
        console.log(
            `%c[${timestamp}] [${category}] ${message}`,
            `color: ${color}; font-weight: bold;`,
            data
        );
    } else {
        console.log(
            `%c[${timestamp}] [${category}] ${message}`,
            `color: ${color}; font-weight: bold;`
        );
    }
};

/**
 * Debug error - ALWAYS logs (even in production) for critical errors
 */
export const debugError = (category: LogCategory | string, message: string, error?: any): void => {
    const timestamp = new Date().toLocaleTimeString();

    console.error(
        `%c[${timestamp}] [${category}] ❌ ${message}`,
        `color: ${LOG_COLORS.ERROR}; font-weight: bold;`
    );

    if (error) {
        // Log full error details
        console.error('Error Details:', {
            message: error?.message || error,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            url: error?.config?.url || error?.request?.responseURL,
            data: error?.response?.data,
            stack: error?.stack,
        });
    }
};

/**
 * Debug warning - shows in console
 */
export const debugWarn = (category: LogCategory | string, message: string, data?: any): void => {
    if (!isDebugEnabled()) return;

    const timestamp = new Date().toLocaleTimeString();

    console.warn(
        `%c[${timestamp}] [${category}] ⚠️ ${message}`,
        `color: ${LOG_COLORS.WARN}; font-weight: bold;`,
        data || ''
    );
};

/**
 * Log API request details
 */
export const logApiRequest = (method: string, url: string, data?: any): void => {
    debugLog('API', `📤 ${method.toUpperCase()} ${url}`, data ? { body: data } : undefined);
};

/**
 * Log API response details
 */
export const logApiResponse = (method: string, url: string, status: number, data?: any): void => {
    const emoji = status >= 200 && status < 300 ? '✅' : '❌';
    debugLog('API', `📥 ${emoji} ${method.toUpperCase()} ${url} [${status}]`, data);
};

/**
 * Log API error with full details
 */
export const logApiError = (method: string, url: string, error: any): void => {
    debugError('API', `${method.toUpperCase()} ${url} failed`, error);
};

/**
 * Format error for display to user (with details)
 */
export const formatErrorForDisplay = (error: any): string => {
    if (!error) return 'Unknown error occurred';

    // If it's already a string
    if (typeof error === 'string') return error;

    // If it has a response from server
    if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message || error.response.data?.error;

        if (serverMessage) {
            return `[${status}] ${serverMessage}`;
        }

        return `Server error [${status}]: ${error.response.statusText || 'Unknown error'}`;
    }

    // If it's a network error
    if (error.request) {
        return `Network error: Unable to reach server. Check your internet connection.`;
    }

    // If it has a message
    if (error.message) {
        return error.message;
    }

    return 'An unexpected error occurred';
};

export default {
    log: debugLog,
    error: debugError,
    warn: debugWarn,
    apiRequest: logApiRequest,
    apiResponse: logApiResponse,
    apiError: logApiError,
    formatError: formatErrorForDisplay,
};
