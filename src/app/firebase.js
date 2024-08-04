// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEl2A7oETrAdupJAEF23ys9sGykofEQEo",
  authDomain: "project-2-92c29.firebaseapp.com",
  projectId: "project-2-92c29",
  storageBucket: "project-2-92c29.appspot.com",
  messagingSenderId: "300716680890",
  appId: "1:300716680890:web:4c11e214234dd42d7d8483",
  measurementId: "G-4DJQGT3FNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {firestore, analytics, auth, provider}