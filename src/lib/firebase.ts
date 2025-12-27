import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// REPLACE WITH YOUR FIREBASE CONFIG
// For Hackathon: Hardcode here or use import.meta.env.VITE_FIREBASE_...
const firebaseConfig = {
  // Cast to any to avoid TypeScript error with Vite's import.meta.env
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: "placement-ai-demo.firebaseapp.com",
  projectId: "placement-ai-demo",
  storageBucket: "placement-ai-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);