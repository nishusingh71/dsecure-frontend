// ═══════════════════════════════════════════════════════════════════════
// D-Secure Service Worker v4 — Cache-First Static Pages
// Static pages: Cache-First (instant cache hit, no network call)
// JS/CSS/Images/Fonts: Cache-First (immutable hashed assets)
// API calls: Network-First with cache fallback
// Auth & payment routes: NEVER cached
// ═══════════════════════════════════════════════════════════════════════

const SW_VERSION = 'v4'
const STATIC_CACHE = `dsecure-static-${SW_VERSION}`
const PAGE_CACHE = `dsecure-pages-${SW_VERSION}`
const IMAGE_CACHE = `dsecure-images-${SW_VERSION}`
const API_CACHE = `dsecure-api-${SW_VERSION}`

// Maximum entries per cache to prevent unbounded growth
const MAX_PAGE_ENTRIES = 100
const MAX_IMAGE_ENTRIES = 200
const MAX_API_ENTRIES = 50

// API cache TTL — cached responses older than this are considered stale
const API_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// ── Routes to NEVER cache (auth, payment) ─────────────────────────────
const NEVER_CACHE_PREFIXES = [
  '/login',
  '/register',
  '/checkout',
  '/payment',
]

// ── Assets to pre-cache on install ────────────────────────────────────
const PRECACHE_ASSETS = [
  '/',
  '/site.webmanifest',
  '/favicon.svg',
]

// ── Helpers ───────────────────────────────────────────────────────────
function isNeverCacheRoute(pathname) {
  return NEVER_CACHE_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

function isSameOrigin(url) {
  return url.origin === self.location.origin
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  if (keys.length > maxEntries) {
    const overflow = keys.length - maxEntries
    for (let i = 0; i < overflow; i++) {
      await cache.delete(keys[i])
    }
  }
}

// Check if a cached API response is still fresh (within TTL)
function isResponseFresh(response) {
  const cachedAt = response.headers.get('sw-cached-at')
  if (!cachedAt) return false
  return (Date.now() - parseInt(cachedAt, 10)) < API_CACHE_TTL
}

// Clone response and add a timestamp header for TTL tracking
async function addTimestamp(response) {
  const body = await response.blob()
  const headers = new Headers(response.headers)
  headers.set('sw-cached-at', Date.now().toString())
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

// ═══════════════════════════════════════════════════════════════════════
// INSTALL — Pre-cache critical assets, skip waiting
// ═══════════════════════════════════════════════════════════════════════
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// ═══════════════════════════════════════════════════════════════════════
// ACTIVATE — Clean up old version caches, claim clients
// ═══════════════════════════════════════════════════════════════════════
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name.startsWith('dsecure-') && !name.endsWith(SW_VERSION))
            .map(name => caches.delete(name))
        )
      })
      .then(() => self.clients.claim())
  )
})

// ═══════════════════════════════════════════════════════════════════════
// FETCH — Route-aware caching strategies
// ═══════════════════════════════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-HTTP(S) requests
  if (!url.protocol.startsWith('http')) return

  // Skip cross-origin requests (analytics, Cloudinary CDN, etc.)
  if (!isSameOrigin(url)) return

  // ── 1. NEVER-CACHE ROUTES → Network only (auth, payment) ──────
  if (isNeverCacheRoute(url.pathname)) return

  // ── 2. API CALLS → Network-First with cache fallback ──────────
  //    Dashboard API data is always fetched fresh from server.
  //    If network fails or is slow, serve from cache as fallback.
  //    Cached responses expire after 5 minutes (API_CACHE_TTL).
  if (url.pathname.startsWith('/api/')) {
    // Only cache GET requests (not POST/PUT/DELETE mutations)
    if (request.method !== 'GET') return

    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const timestamped = await addTimestamp(response)
            const cache = await caches.open(API_CACHE)
            cache.put(request, timestamped.clone())
            trimCache(API_CACHE, MAX_API_ENTRIES)
            return timestamped
          }
          return response
        })
        .catch(async () => {
          // Network failed — try cache
          const cached = await caches.match(request)
          if (cached) {
            // Return cached even if stale — better than nothing offline
            return cached
          }
          // No cache available — return error
          return new Response(
            JSON.stringify({ error: 'Offline', message: 'No cached data available' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          )
        })
    )
    return
  }

  // ── 3. HASHED JS/CSS ASSETS → Cache-First (immutable) ─────────
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then(cache => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // ── 4. FONTS → Cache-First ────────────────────────────────────
  if (url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then(cache => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // ── 5. IMAGES → Cache-First with size limit ───────────────────
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(request, clone)
              trimCache(IMAGE_CACHE, MAX_IMAGE_ENTRIES)
            })
          }
          return response
        })
      })
    )
    return
  }

  // ── 6. ALL HTML PAGES → Cache-First (instant cache hit) ────────
  //    Static pages served directly from cache — no network call.
  //    Only fetches from network when page is not yet cached.
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached // ✅ Cache hit — serve instantly, no network
        return fetch(request)
          .then(response => {
            if (response.ok) {
              const clone = response.clone()
              caches.open(PAGE_CACHE).then(cache => {
                cache.put(request, clone)
                trimCache(PAGE_CACHE, MAX_PAGE_ENTRIES)
              })
            }
            return response
          })
          .catch(() => caches.match('/')) // Offline fallback
      })
    )
    return
  }
})