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

// Preload critical resources
preloadCriticalResources();

// Optimized performance monitoring
if ("performance" in window && process.env.NODE_ENV === 'production') {
  // Defer performance monitoring to avoid blocking main thread
  setTimeout(() => {
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log(entry.name, entry.startTime);
        }
      });
    }).observe({ entryTypes: ["largest-contentful-paint", "first-input", "cumulative-layout-shift"] });
  }, 1000);
}

// Register service worker for caching (production only)
if ("serviceWorker" in navigator && process.env.NODE_ENV === 'production') {
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

// Optimize React rendering
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Use concurrent features for better performance
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
