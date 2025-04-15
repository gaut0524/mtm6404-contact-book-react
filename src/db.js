
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8jX4NzdTRQ6VpPotanAiIZGlO48G3zno",
  authDomain: "contact-book-de93e.firebaseapp.com",
  projectId: "contact-book-de93e",
  storageBucket: "contact-book-de93e.firebasestorage.app",
  messagingSenderId: "202131792873",
  appId: "1:202131792873:web:44a21113469b3372e0e178"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
