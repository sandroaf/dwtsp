// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');
const firebaseConfig = {
    apiKey: "AIzaSyDEQ0L3QYUKxXucJjMe30lrI0_XZmcDNZk",
    authDomain: "services-sandroaf.firebaseapp.com",
    projectId: "services-sandroaf",
    storageBucket: "services-sandroaf.appspot.com",
    messagingSenderId: "8530075618",
    appId: "1:8530075618:web:476219e15e278d98d2a3bb",
    measurementId: "G-STZ7LQHZK3"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
  const data = event.data.json();
  self.registration.showNotification(data.notification.title, {
    body: data.notification.body,
    icon: '/img/logo-dwtsp-96.png'
  });
});
