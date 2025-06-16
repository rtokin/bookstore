// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRS5quH0zsZMlxfpwlNc3W3R6x9cX6fo",
  authDomain: "streetbook-e6099.firebaseapp.com",
  projectId: "streetbook-e6099",
  storageBucket: "streetbook-e6099.appspot.com",
  messagingSenderId: "794950402770",
  appId: "1:794950402770:web:f43c2e68329bc2bdd4230b",
  measurementId: "G-3PPK0BM7EN",
};

// 1) Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2) Export Firestore database
export const db = getFirestore(app);

// 3) Export Auth instance
const auth = getAuth(app);

// 4) Registration
export function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// 5) Login
export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// 6) Logout
export function logout() {
  return signOut(auth);
}

// 7) Listen to auth state
export function onUserStateChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
