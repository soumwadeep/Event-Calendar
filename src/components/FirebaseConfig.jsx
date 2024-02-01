import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCILNnKp0FKtVEz3TNZlwFAA3eo6qO_m4o",
  authDomain: "event-scheduler-11708.firebaseapp.com",
  projectId: "event-scheduler-11708",
  storageBucket: "event-scheduler-11708.appspot.com",
  messagingSenderId: "33533737447",
  appId: "1:33533737447:web:a73e30f4999d9bd79f2542",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
