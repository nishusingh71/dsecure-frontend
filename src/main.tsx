import { ENV } from './config/env';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./critical.css";
import "./responsive.css";
import { HelmetProvider } from "react-helmet-async";
import { ToastProvider } from './components/Toast';
import { preloadCriticalResources } from './utils/performanceOptimizer';
import i18n from './utils/internationalization'; // Initialize i18n
import { I18nextProvider } from 'react-i18next';

// -------------------------------------------------------------------------------
// ?? GLOBAL CONSOLE SUPPRESSOR - Keeps browser console clean
// -------------------------------------------------------------------------------
const ENABLE_CONSOLE = true; // Set to true to enable console output for debugging

if (!ENABLE_CONSOLE) {
  const noop = () => { };
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.info = noop;
  console.debug = noop;
}
// -------------------------------------------------------------------------------

// Preload critical resources
import { addResourceHints } from "./utils/performanceOptimizer";
addResourceHints();
preloadCriticalResources();

// Optimized performance monitoring
if ("performance" in window && ENV.IS_PROD) {
  // Defer performance monitoring to avoid blocking main thread
  setTimeout(() => {
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        // Only log in development
        if (ENV.IS_DEV) {
          // console.log(entry.name, entry.startTime);
        }
      });
    }).observe({ entryTypes: ["largest-contentful-paint", "first-input", "cumulative-layout-shift"] });
  }, 1000);
}

// Register service worker for caching (production only)
if ("serviceWorker" in navigator && ENV.IS_PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {
        // Silently fail in production
      });
  });
}

// Handle redirects from 404.html
const redirectPath = sessionStorage.getItem("redirectPath");
if (redirectPath) {
  sessionStorage.removeItem("redirectPath");
  window.history.replaceState(null, "", redirectPath);
}

// Handle legacy redirect from sessionStorage.redirect (from 404.html)
if (sessionStorage.redirect) {
  const url = new URL(sessionStorage.redirect);
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

// Optimize React rendering & Hydration
const rootElement = document.getElementById("root")!;
const isPrerendered = "prerendered" in rootElement.dataset;

const appWrapper = (
  <React.StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ToastProvider>
            <App />
          </ToastProvider>
        </BrowserRouter>
      </I18nextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

const mountApp = () => {
  if (isPrerendered) {
    // Hydrate statically pre-rendered HTML sent by Node SSG
    ReactDOM.hydrateRoot(rootElement, appWrapper);
  } else {
    // Standard SPA initialization for Dev mode or un-prerendered routes
    rootElement.innerHTML = '';
    const root = ReactDOM.createRoot(rootElement);
    root.render(appWrapper);
  }
};

// Wait for i18next to load before hydrating, otherwise it renders keys momentarily
if (i18n.isInitialized) {
  mountApp();
} else {
  i18n.on('initialized', mountApp);
}
