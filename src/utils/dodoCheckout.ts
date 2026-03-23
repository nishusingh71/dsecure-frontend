/**
 * Dodo Payments Overlay Checkout Utility
 * Overlay checkout SDK se payment form full-screen overlay mein dikhta hai
 * Product summary left mein, form right mein — Dodo ka built-in UI
 */

import { DodoPayments } from 'dodopayments-checkout';
import type { CheckoutEvent } from 'dodopayments-checkout';

// SDK initialized hai ya nahi track karne ke liye flag
let isInitialized = false;

/**
 * Checkout ke liye callback types
 */
interface CheckoutCallbacks {
  /** Jab checkout successfully complete ho jaye */
  onComplete?: () => void;
  /** Jab user checkout band kare */
  onClose?: () => void;
}

// Callbacks store karna zaroori hai taaki event handler mein access ho sake
let storedCallbacks: CheckoutCallbacks = {};

/**
 * Dodo Payments SDK ko overlay mode mein initialize karo
 * Ye ek baar call hota hai, phir reuse hota hai
 */
export function initDodoCheckout(callbacks?: CheckoutCallbacks): void {
  // Agar pehle se initialized hai toh skip karo
  if (isInitialized) return;

  // Callbacks store karo
  if (callbacks) {
    storedCallbacks = callbacks;
  }

  // SDK ko overlay mode mein initialize karo — full-screen two-column layout
  DodoPayments.Initialize({
    mode: 'live',
    displayType: 'overlay',
    linkType: 'static',
    onEvent: (event: CheckoutEvent) => {
      console.log('🔔 Dodo Checkout Event:', event.event_type, event.data);

      // Event types ke basis par callbacks trigger karo
      switch (event.event_type) {
        case 'checkout.closed':
          storedCallbacks.onClose?.();
          break;
        case 'checkout.redirect':
        case 'checkout.redirect_requested':
          storedCallbacks.onComplete?.();
          break;
        case 'checkout.keys_provided':
          // License keys mil gaye — payment complete
          storedCallbacks.onComplete?.();
          break;
        default:
          break;
      }
    },
  });

  isInitialized = true;
}

/**
 * Overlay checkout open karo — SDK khud full-screen overlay dikhayega
 * Left mein product summary, right mein checkout form
 * 
 * @param productId - Dodo Payments product ID (e.g., "pdt_0NVH5wJYMX70syW3ioj9R")
 * @param quantity - Kitne licenses chahiye
 * @param redirectUrl - Payment complete hone ke baad redirect URL (optional)
 */
export function openOverlayCheckout(
  productId: string,
  quantity: number,
  redirectUrl?: string
): void {
  // Agar SDK initialized nahi hai toh pehle initialize karo
  if (!isInitialized) {
    initDodoCheckout();
  }

  // D-Secure website ke colors se matching theme config
  const dsecureTheme = {
    light: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f0fdfa',        // teal-50 — light teal background
      borderPrimary: '#ccfbf1',      // teal-100
      borderSecondary: '#99f6e4',    // teal-200
      textPrimary: '#0f172a',        // slate-900
      textSecondary: '#475569',      // slate-500
      textPlaceholder: '#94a3b8',    // slate-400
      textError: '#dc2626',
      textSuccess: '#0d9488',        // teal-600
      buttonPrimary: '#0d9488',      // teal-600 — main brand color
      buttonPrimaryHover: '#0f766e', // teal-700
      buttonTextPrimary: '#ffffff',
      buttonSecondary: '#f0fdfa',    // teal-50
      buttonSecondaryHover: '#ccfbf1', // teal-100
      buttonTextSecondary: '#0d9488',  // teal-600
      inputFocusBorder: '#14b8a6',   // teal-500
    },
  };

  // Overlay checkout open karo — SDK apna full-screen UI dikhayega
  DodoPayments.Checkout.open({
    products: [{ productId, quantity }],
    redirectUrl: redirectUrl,
    options: {
      themeConfig: dsecureTheme,
      payButtonText: 'Pay Now',
    },
  });
}

/**
 * Checkout band karo (agar user manually close kare)
 */
export function closeOverlayCheckout(): void {
  try {
    DodoPayments.Checkout.close();
  } catch (error) {
    console.warn('Checkout close mein error:', error);
  }
}

export default {
  initDodoCheckout,
  openOverlayCheckout,
  closeOverlayCheckout,
};
