// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx8JkjLtF9aDV0ITVaWNm8XIjxVncXfDk",
  authDomain: "blog-letsmake.firebaseapp.com",
  projectId: "blog-letsmake",
  storageBucket: "blog-letsmake.appspot.com",
  messagingSenderId: "55654637424",
  appId: "1:55654637424:web:1bd5952cb7d6027d9179b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
