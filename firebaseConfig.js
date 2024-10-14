// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
