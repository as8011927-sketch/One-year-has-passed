const CACHE_NAME = 'hz-pwa-static-v1';
const OFFLINE_URL = '/offline.html';

// Public static assets safe to cache
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // STRICT PRIVACY: NEVER cache API routes, auth, private session endpoints, or supabase requests
  // MEDIA: Never intercept audio/video streams or range requests to allow native browser media streaming & 206 responses
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('verify-secret') ||
    url.pathname.includes('supabase') ||
    url.pathname.startsWith('/audio/') ||
    event.request.destination === 'audio' ||
    event.request.destination === 'video' ||
    event.request.headers.has('range') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedOffline = await cache.match(OFFLINE_URL);
        return cachedOffline || new Response('Offline', { status: 503 });
      })
    );
    return;
  }

  // For static assets, try cache then network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Return offline page for html requests
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
