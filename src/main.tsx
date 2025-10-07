import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./critical.css";
import "./responsive.css";
import { HelmetProvider } from "react-helmet-async";

// Performance monitoring
if ("performance" in window) {
  const reportWebVitals = (metric: any) => {
    //console.log(metric)
  };

  window.addEventListener("load", () => {
    // Report LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        reportWebVitals({
          name: "LCP",
          value: entry.startTime,
          id: "lcp",
        });
      });
    }).observe({ entryTypes: ["largest-contentful-paint"] });
  });
}

// Register service worker for caching
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        //console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        //console.log('SW registration failed: ', registrationError)
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
