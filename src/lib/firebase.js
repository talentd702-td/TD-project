import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADyiRwnf133HWpAMuzlH1bAczhnFPdQBY",
  authDomain: "askthestars-37936.firebaseapp.com",
  projectId: "askthestars-37936",
  storageBucket: "askthestars-37936.firebasestorage.app",
  messagingSenderId: "92025762925",
  appId: "1:92025762925:web:f34a38684c872de8e87b64",
  measurementId: "G-6D3VCGZEVQ"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();