import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDnnJ7p7qB05XhAJ6w-jHAnQDpwYBNe4Hk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "steam-rest.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "steam-rest",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "steam-rest.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "700666316737",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:700666316737:web:9a88d47a33414b7d299140",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-6TGB39JLJK",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);

let analytics: Analytics | null = null;

export const initializeAnalytics = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!analytics) {
    analytics = getAnalytics(app);
  }

  return analytics;
};
