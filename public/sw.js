// Service Worker for D-Secure - Offline Support & Performance Optimization
const CACHE_NAME = "dsecure-v1.1";
const STATIC_CACHE = "dsecure-static-v1.1";
const DYNAMIC_CACHE = "dsecure-dynamic-v1.1";

// Core assets to cache immediately for valid offline start
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/site.webmanifest",
  "/favicon.svg",
  "/favicon.png",
  "/dsecure-logo-white.svg",
  "/dsecure-logo-black.svg",
  "/logo-white.svg",
  "/logo-black.svg",
];

// 1. Install Event: Pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// 2. Activate Event: Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (![STATIC_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// 3. Fetch Event: Intelligent Caching & Offline Fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-http requests and POST/PUT/DELETE
  if (!url.protocol.startsWith("http") || request.method !== "GET") {
    return;
  }

  // Skip API requests and sensitive routes from caching
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("/login") ||
    url.pathname.includes("/register") ||
    url.pathname.includes("/checkout") ||
    url.pathname.includes("/payment")
  ) {
    return;
  }

  // Strategy Mapping
  if (request.destination === "document") {
    // HTML/Navigation: Network-first, fallback to cache, then to app-shell
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches
              .open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          return caches
            .match(request)
            .then((cachedResponse) => cachedResponse || caches.match("/"));
        }),
    );
  } else if (request.destination === "image") {
    // Images: Cache-First (save bandwidth)
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches
                .open(DYNAMIC_CACHE)
                .then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
        );
      }),
    );
  } else if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font"
  ) {
    // JS/CSS/Fonts: Stale-While-Revalidate
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches
              .open(DYNAMIC_CACHE)
              .then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      }),
    );
  }
});
