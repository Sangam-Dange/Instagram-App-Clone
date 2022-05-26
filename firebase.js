// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD1ZI9yZGq1KI9EeAWIJGd6LfYrfOJt6SU",
  authDomain: "instagram-app-86398.firebaseapp.com",
  projectId: "instagram-app-86398",
  storageBucket: "instagram-app-86398.appspot.com",
  messagingSenderId: "816033337484",
  appId: "1:816033337484:web:841a27812e978ef56deba9",
  measurementId: "G-0NCQV93Z15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};
