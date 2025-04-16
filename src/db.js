
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "contact-book-de93e.firebaseapp.com",
  projectId: "contact-book-de93e",
  storageBucket: "contact-book-de93e.firebasestorage.app",
  messagingSenderId: "202131792873",
  appId: "1:202131792873:web:44a21113469b3372e0e178"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
