import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUOHKfHy35G4M3pUxWHerEWxPQ-zYvyg8",
  authDomain: "naya-india-esportsa.firebaseapp.com",
  projectId: "naya-india-esportsa",
  storageBucket: "naya-india-esportsa.firebasestorage.app",
  messagingSenderId: "541751208129",
  appId: "1:541751208129:web:973af506812cfe23d14c40",
  measurementId: "G-N7CMN7CMLN"
};

const configured = Boolean(
  config.apiKey &&
  config.authDomain &&
  config.projectId &&
  config.appId
);

const app = configured
  ? (getApps().length ? getApps()[0] : initializeApp(config))
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();
export const firebaseReady = configured;
