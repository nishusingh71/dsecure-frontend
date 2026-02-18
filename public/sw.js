// Service Worker for Performance Optimization
const CACHE_NAME = 'dsecure-v1'
const STATIC_CACHE = 'dsecure-static-v1'
const DYNAMIC_CACHE = 'dsecure-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/dsecure-logo-black.svg',
  '/dsecure-logo-white.svg',
  '/favicon.svg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle different types of requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  if (request.destination === 'image') {
    // Images: Cache first, then network
    event.respondWith(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                return response
              }
              return fetch(request)
                .then((networkResponse) => {
                  cache.put(request, networkResponse.clone())
                  return networkResponse
                })
            })
        })
    )
  } else if (request.destination === 'script' || request.destination === 'style') {
    // JS/CSS: Network first, fallback to cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache valid responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone)
            })
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
  } else if (request.destination === 'document') {
    // HTML: Network first, fallback to cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache valid responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone)
            })
          return response
        })
        .catch(() => {
          return caches.match(request)
            .then((response) => {
              return response || caches.match('/')
            })
        })
    )
  } else if (url.pathname.endsWith('site.webmanifest')) {
    // Manifest: Stale-while-revalidate or Cache First
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request).then((networkResponse) => {
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, networkResponse.clone());
          });
          return networkResponse;
        });
        return cachedResponse || networkFetch;
      })
    );
  }
})

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'performance-sync') {
    event.waitUntil(
      // Send performance metrics when connection is restored
      sendPerformanceMetrics()
    )
  }
})

function sendPerformanceMetrics() {
  // Implementation for sending cached performance metrics
  return Promise.resolve()
}