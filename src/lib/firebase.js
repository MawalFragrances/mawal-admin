import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";

const firebaseConfig = {
    apiKey: "AIzaSyBKn8UEV__WksKzdbxW5pQ0Xws4hS2rp-I",
    authDomain: "mawal-fragrances.firebaseapp.com",
    projectId: "mawal-fragrances",
    storageBucket: "mawal-fragrances.firebasestorage.app",
    messagingSenderId: "757594234120",
    appId: "1:757594234120:web:2df8dc55ee2db1c69a20bd",
    measurementId: "G-668VN6H2ND"
};

const app = initializeApp(firebaseConfig);

// FOR GOOGLE AUTHENTICATION
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// FOR PUSH NOTIFICATIONS
const vapidKey = "BG5JtkgYgaTyhWyXt-pybrESxZdr-C3i9sseuKCFpsn8XOGsmhwZGlnl5lDLmqC-2uOJDm7U3sU05INEt37nzHE";

const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    return Notification.requestPermission().then(async () => {
        if (Notification.permission === "granted") {
            try {
                const token = await getToken(messaging, { vapidKey });
                return token;
            } catch (error) {
                console.error("Error getting FCM token:", error);
                return null;
            }
        } else {
            toast.error("Please enable notifications to receive updates.");
            return null;
        }
    });
};
