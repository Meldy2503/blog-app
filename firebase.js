// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-cT475ANEWYcjeji9Pb5UTt7UM6bsV7s",
  authDomain: "blog-app-95960.firebaseapp.com",
  projectId: "blog-app-95960",
  storageBucket: "blog-app-95960.appspot.com",
  messagingSenderId: "522540567960",
  appId: "1:522540567960:web:dffb436af70356c731afed",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, provider };
