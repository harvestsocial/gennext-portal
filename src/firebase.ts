import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsLAPNsN1P-QdfNf0GDjaYr_SNZ31ha_0",
    authDomain: "gennext-harare.firebaseapp.com",
    projectId: "gennext-harare",
    storageBucket: "gennext-harare.firebasestorage.app",
    messagingSenderId: "443220001073",
    appId: "1:443220001073:web:302072fde3020b063bf010",
    measurementId: "G-F2DR7WLRTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use initializeFirestore to enable long polling for better reliability in some networks
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

// Avoid crashing app startup in environments where Analytics is unsupported.
if (typeof window !== "undefined") {
    void isSupported()
        .then((supported) => {
            if (supported) {
                getAnalytics(app);
            }
        })
        .catch(() => {
            // Ignore analytics initialization errors; Firestore should still work.
        });
}
