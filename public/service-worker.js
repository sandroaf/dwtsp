
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDEQ0L3QYUKxXucJjMe30lrI0_XZmcDNZk",
  authDomain: "services-sandroaf.firebaseapp.com",
  projectId: "services-sandroaf",
  storageBucket: "services-sandroaf.appspot.com",
  messagingSenderId: "8530075618",
  appId: "1:8530075618:web:476219e15e278d98d2a3bb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});

const cacheName = 'meuAppCache-v5';
// Adicione outros arquivos que deseja armazenar em cache
const resourcesToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/estilo.css',
    '/scripts/main.js',
    '/img/android/android-launchericon-144-144.png',
    '/img/android/android-launchericon-192-192.png',
    '/img/android/android-launchericon-48-48.png',
    '/img/android/android-launchericon-512-512.png',
    '/img/android/android-launchericon-72-72.png',
    '/img/android/android-launchericon-96-96.png',
    '/img/ios/100.png',
    '/img/ios/1024.png',
    '/img/ios/114.png',
    '/img/ios/120.png',
    '/img/ios/128.png',
    '/img/ios/144.png',
    '/img/ios/152.png',
    '/img/ios/167.png',
    '/img/ios/16.png',
    '/img/ios/180.png',
    '/img/ios/192.png',
    '/img/ios/20.png',
    '/img/ios/256.png',
    '/img/ios/29.png',
    '/img/ios/32.png',
    '/img/ios/40.png',
    '/img/ios/50.png',
    '/img/ios/512.png',
    '/img/ios/57.png',
    '/img/ios/58.png',
    '/img/ios/60.png',
    '/img/ios/64.png',
    '/img/ios/72.png',
    '/img/ios/76.png',
    '/img/ios/80.png',
    '/img/ios/87.png',
    '/img/logo-dwtsp-16.ico',
    '/img/logo-dwtsp-40.png',
    '/img/logo-dwtsp-512.png',
    '/img/logo-dwtsp-96.png',
    '/img/logo-dwtsp.png',
    '/img/windows11/LargeTile.scale-100.png',
    '/img/windows11/LargeTile.scale-125.png',
    '/img/windows11/LargeTile.scale-150.png',
    '/img/windows11/LargeTile.scale-200.png',
    '/img/windows11/LargeTile.scale-400.png',
    '/img/windows11/SmallTile.scale-100.png',
    '/img/windows11/SmallTile.scale-125.png',
    '/img/windows11/SmallTile.scale-150.png',
    '/img/windows11/SmallTile.scale-200.png',
    '/img/windows11/SmallTile.scale-400.png',
    '/img/windows11/SplashScreen.scale-100.png',
    '/img/windows11/SplashScreen.scale-125.png',
    '/img/windows11/SplashScreen.scale-150.png',
    '/img/windows11/SplashScreen.scale-200.png',
    '/img/windows11/SplashScreen.scale-400.png',
    '/img/windows11/Square150x150Logo.scale-100.png',
    '/img/windows11/Square150x150Logo.scale-125.png',
    '/img/windows11/Square150x150Logo.scale-150.png',
    '/img/windows11/Square150x150Logo.scale-200.png',
    '/img/windows11/Square150x150Logo.scale-400.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
    '/img/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
    '/img/windows11/Square44x44Logo.scale-100.png',
    '/img/windows11/Square44x44Logo.scale-125.png',
    '/img/windows11/Square44x44Logo.scale-150.png',
    '/img/windows11/Square44x44Logo.scale-200.png',
    '/img/windows11/Square44x44Logo.scale-400.png',
    '/img/windows11/Square44x44Logo.targetsize-16.png',
    '/img/windows11/Square44x44Logo.targetsize-20.png',
    '/img/windows11/Square44x44Logo.targetsize-24.png',
    '/img/windows11/Square44x44Logo.targetsize-256.png',
    '/img/windows11/Square44x44Logo.targetsize-30.png',
    '/img/windows11/Square44x44Logo.targetsize-32.png',
    '/img/windows11/Square44x44Logo.targetsize-36.png',
    '/img/windows11/Square44x44Logo.targetsize-40.png',
    '/img/windows11/Square44x44Logo.targetsize-44.png',
    '/img/windows11/Square44x44Logo.targetsize-48.png',
    '/img/windows11/Square44x44Logo.targetsize-60.png',
    '/img/windows11/Square44x44Logo.targetsize-64.png',
    '/img/windows11/Square44x44Logo.targetsize-72.png',
    '/img/windows11/Square44x44Logo.targetsize-80.png',
    '/img/windows11/Square44x44Logo.targetsize-96.png',
    '/img/windows11/StoreLogo.scale-100.png',
    '/img/windows11/StoreLogo.scale-125.png',
    '/img/windows11/StoreLogo.scale-150.png',
    '/img/windows11/StoreLogo.scale-200.png',
    '/img/windows11/StoreLogo.scale-400.png',
    '/img/windows11/Wide310x150Logo.scale-100.png',
    '/img/windows11/Wide310x150Logo.scale-125.png',
    '/img/windows11/Wide310x150Logo.scale-150.png',
    '/img/windows11/Wide310x150Logo.scale-200.png',
    '/img/windows11/Wide310x150Logo.scale-400.png', 
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToCache).catch((error) => {
        console.error('Falha ao adicionar arquivos ao cache:', error);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignora requisições que a Cache API não suporta (ex: chrome-extension://, POST)
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(cacheName).then((cache) => {
            return cache.put(event.request, networkResponse.clone()).then(() => networkResponse);
          });
        });
      })
      .catch(() => {
            // Fallback: retorna uma página offline ou uma resposta padrão
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            // Para imagens, pode retornar uma imagem padrão
            if (event.request.destination === 'image') {
              return caches.match('/img/logo-dwtsp-96.png');
            }
            // Para outros casos, retorna uma resposta vazia
            return new Response('Você está offline.', {
              status: 503,
              statusText: 'Offline',
              headers: { 'Content-Type': 'text/plain' }
            });
          })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});