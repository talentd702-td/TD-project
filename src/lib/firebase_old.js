import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXMqvcwZ3mRaJyKj7FxR273KNuKEn_dWU",
  authDomain: "chitramapp.firebaseapp.com",
  projectId: "chitramapp",
  storageBucket: "chitramapp.firebasestorage.app",
  messagingSenderId: "19373309399",
  appId: "1:19373309399:web:d1173828620a051fb41f92",
  measurementId: "G-5BRQX5F2WS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();