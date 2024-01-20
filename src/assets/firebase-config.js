// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAkLE-hvj6JoZ7WYKyd_06A2Bivmrw3nE",
  authDomain: "fine-finance-3f6fe.firebaseapp.com",
  projectId: "fine-finance-3f6fe",
  storageBucket: "fine-finance-3f6fe.appspot.com",
  messagingSenderId: "472637599339",
  appId: "1:472637599339:web:bb4d3b9bdeaca782d1cb2e",
  measurementId: "G-NXK9Y0KQXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();