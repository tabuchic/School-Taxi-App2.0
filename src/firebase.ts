// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDivuPS-Uo55FDMStq_E1nh8T-GrgJkpv8",
  authDomain: "school-taxi-app.firebaseapp.com",
  projectId: "school-taxi-app",
  storageBucket: "school-taxi-app.firebasestorage.app",
  messagingSenderId: "650073503735",
  appId: "1:650073503735:web:37409deffd6100e17820f2",
  measurementId: "G-BSD4BLERLM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;