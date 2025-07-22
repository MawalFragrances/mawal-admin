// Firebase messaging service worker
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBKn8UEV__WksKzdbxW5pQ0Xws4hS2rp-I",
    authDomain: "mawal-fragrances.firebaseapp.com",
    projectId: "mawal-fragrances",
    storageBucket: "mawal-fragrances.firebasestorage.app",
    messagingSenderId: "757594234120",
    appId: "1:757594234120:web:2df8dc55ee2db1c69a20bd",
    measurementId: "G-668VN6H2ND"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title || "New Message";
    const notificationOptions = {
        body: payload.notification.body || "",
        icon: "https://res.cloudinary.com/drjpxqwy0/image/upload/v1751703968/icon_brob0z.png",
        badge: "https://res.cloudinary.com/drjpxqwy0/image/upload/v1751703968/icon_brob0z.png",
        data: payload.data || {}
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
}); 