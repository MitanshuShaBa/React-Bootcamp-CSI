// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN2gqRqB7lrK4LKaOg-kLod3i36rstMBY",
  authDomain: "e-commerce-csi.firebaseapp.com",
  projectId: "e-commerce-csi",
  storageBucket: "e-commerce-csi.appspot.com",
  messagingSenderId: "1029803287275",
  appId: "1:1029803287275:web:e29910e4805744f57754ae",
  measurementId: "G-QYV79KQQYG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
