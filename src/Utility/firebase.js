import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwdKtUeTcXBZfZLiqV2nLLsz-JbHsnO5s",
  authDomain: "clone-2024-3a64a.firebaseapp.com",
  projectId: "clone-2024-3a64a",
  storageBucket: "clone-2024-3a64a.appspot.com",
  messagingSenderId: "369774452610",
  appId: "1:369774452610:web:237354185cc1a64e15399b",
  measurementId: "G-RV79HGX6DG",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
// export default app;
