// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcLZsj89t7hKe7DM8QxjnhUDE_YC858U4",
  authDomain: "adp-engineering-society.firebaseapp.com",
  projectId: "adp-engineering-society",
  storageBucket: "adp-engineering-society.appspot.com",
  messagingSenderId: "1019136644050",
  appId: "1:1019136644050:web:3941c08d7680ccb9886e0b",
  measurementId: "G-HC61T815GC",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(firebaseApp);

// Initialize Firestore and Storage
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, analytics, db, storage };
