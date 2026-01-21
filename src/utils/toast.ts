// Toast notification utility for the entire application

export interface ToastNotification {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Global toast state management
let toastHandler: ((toast: ToastNotification) => void) | null = null;

/**
 * Register a toast handler (called by the ToastProvider)
 */
export const registerToastHandler = (handler: (toast: ToastNotification) => void) => {
  toastHandler = handler;
};

/**
 * Show a toast notification
 * @param message - The message to display
 * @param type - The type of toast ('success' | 'error' | 'warning' | 'info')
 * @param duration - Duration in milliseconds (default: 5000)
 */
export const showToast = (
  message: string, 
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  duration: number = 5000
) => {
  if (toastHandler) {
    toastHandler({ message, type, duration });
  } else {
    // Fallback to console if no handler is registered
    // console.log(`Toast [${type.toUpperCase()}]: ${message}`);
  }
};

// Convenience methods for specific toast types
export const showSuccessToast = (message: string, duration?: number) => 
  showToast(message, 'success', duration);

export const showErrorToast = (message: string, duration?: number) => 
  showToast(message, 'error', duration);

export const showWarningToast = (message: string, duration?: number) => 
  showToast(message, 'warning', duration);

export const showInfoToast = (message: string, duration?: number) => 
  showToast(message, 'info', duration);