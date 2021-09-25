// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVpM5PirVrrLiIRbbApD6ZQLIsDMXWcN8",
  authDomain: "csi-social-media.firebaseapp.com",
  projectId: "csi-social-media",
  storageBucket: "csi-social-media.appspot.com",
  messagingSenderId: "1016724573289",
  appId: "1:1016724573289:web:62a9cfe8c8292892e866f8",
  measurementId: "G-WYMRYWRGQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
