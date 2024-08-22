const cacheName = 'meuAppCache-v1';
// Adicione outros arquivos que deseja armazenar em cache
const resourcesToCache = [
    '/',
    '/index.html',
    '/estilo.css',
    '/main.js',
    '/server-worker.js',
    './android/android-launchericon-144-144.png',
    './android/android-launchericon-192-192.png',
    './android/android-launchericon-48-48.png',
    './android/android-launchericon-512-512.png',
    './android/android-launchericon-72-72.png',
    './android/android-launchericon-96-96.png',
    './ios/100.png',
    './ios/1024.png',
    './ios/114.png',
    './ios/120.png',
    './ios/128.png',
    './ios/144.png',
    './ios/152.png',
    './ios/167.png',
    './ios/16.png',
    './ios/180.png',
    './ios/192.png',
    './ios/20.png',
    './ios/256.png',
    './ios/29.png',
    './ios/32.png',
    './ios/40.png',
    './ios/50.png',
    './ios/512.png',
    './ios/57.png',
    './ios/58.png',
    './ios/60.png',
    './ios/64.png',
    './ios/72.png',
    './ios/76.png',
    './ios/80.png',
    './ios/87.png',
    './logo-dwtsp-16.ico',
    './logo-dwtsp-40.png',
    './logo-dwtsp-512.png',
    './logo-dwtsp-96.png',
    './logo-dwtsp.png',
    './windows11/LargeTile.scale-100.png',
    './windows11/LargeTile.scale-125.png',
    './windows11/LargeTile.scale-150.png',
    './windows11/LargeTile.scale-200.png',
    './windows11/LargeTile.scale-400.png',
    './windows11/SmallTile.scale-100.png',
    './windows11/SmallTile.scale-125.png',
    './windows11/SmallTile.scale-150.png',
    './windows11/SmallTile.scale-200.png',
    './windows11/SmallTile.scale-400.png',
    './windows11/SplashScreen.scale-100.png',
    './windows11/SplashScreen.scale-125.png',
    './windows11/SplashScreen.scale-150.png',
    './windows11/SplashScreen.scale-200.png',
    './windows11/SplashScreen.scale-400.png',
    './windows11/Square150x150Logo.scale-100.png',
    './windows11/Square150x150Logo.scale-125.png',
    './windows11/Square150x150Logo.scale-150.png',
    './windows11/Square150x150Logo.scale-200.png',
    './windows11/Square150x150Logo.scale-400.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
    './windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-30.png',,
    './windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
    './windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
    './windows11/Square44x44Logo.scale-100.png',
    './windows11/Square44x44Logo.scale-125.png',
    './windows11/Square44x44Logo.scale-150.png',
    './windows11/Square44x44Logo.scale-200.png',
    './windows11/Square44x44Logo.scale-400.png',
    './windows11/Square44x44Logo.targetsize-16.png',
    './windows11/Square44x44Logo.targetsize-20.png',
    './windows11/Square44x44Logo.targetsize-24.png',
    './windows11/Square44x44Logo.targetsize-256.png',
    './windows11/Square44x44Logo.targetsize-30.png',
    './windows11/Square44x44Logo.targetsize-32.png',
    './windows11/Square44x44Logo.targetsize-36.png',
    './windows11/Square44x44Logo.targetsize-40.png',
    './windows11/Square44x44Logo.targetsize-44.png',
    './windows11/Square44x44Logo.targetsize-48.png',
    './windows11/Square44x44Logo.targetsize-60.png',
    './windows11/Square44x44Logo.targetsize-64.png',
    './windows11/Square44x44Logo.targetsize-72.png',
    './windows11/Square44x44Logo.targetsize-80.png',
    './windows11/Square44x44Logo.targetsize-96.png',
    './windows11/StoreLogo.scale-100.png',
    './windows11/StoreLogo.scale-125.png',
    './windows11/StoreLogo.scale-150.png',
    './windows11/StoreLogo.scale-200.png',
    './windows11/StoreLogo.scale-400.png',
    './windows11/Wide310x150Logo.scale-100.png',
    './windows11/Wide310x150Logo.scale-125.png',
    './windows11/Wide310x150Logo.scale-150.png',
    './windows11/Wide310x150Logo.scale-200.png',
    './windows11/Wide310x150Logo.scale-400.png', 
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(resourcesToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
  );
});
