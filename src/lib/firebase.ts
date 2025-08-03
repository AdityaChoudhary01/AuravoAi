// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "auravo-ai",
  appId: "1:838540065918:web:bde96a366cc52d5af72c2f",
  storageBucket: "auravo-ai.firebasestorage.app",
  apiKey: "AIzaSyA3z7jSI2i6B8cQjK73B4OZqoO8jCgG4U0",
  authDomain: "auravo-ai.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "838540065918"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
