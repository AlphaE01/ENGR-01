// src/firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcLZsj89t7hKe7DM8QxjnhUDE_YC858U4",
  authDomain: "adp-engineering-society.firebaseapp.com",
  projectId: "adp-engineering-society",
  storageBucket: "adp-engineering-society.appspot.com",
  messagingSenderId: "1019136644050",
  appId: "1:1019136644050:web:3941c08d7680ccb9886e0b",
  measurementId: "G-HC61T815GC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(firebaseApp);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Storage
const storage = getStorage(firebaseApp);

// Export Firestore and Storage
export { db, storage };
