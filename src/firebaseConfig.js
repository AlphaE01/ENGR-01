import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};

const firebaseApp = initializeApp(firebaseConfig);

let analytics;
try {
  analytics = getAnalytics(firebaseApp);
} catch (error) {
  console.warn("Firebase Analytics not available: ", error);
}

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, analytics, db, storage };
