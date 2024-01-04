// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5VMbQNvwhvrT1w_0mCJDvqC0KKS6HwAU",
  authDomain: "loungeapp-503f3.firebaseapp.com",
  projectId: "loungeapp-503f3",
  storageBucket: "loungeapp-503f3.appspot.com",
  messagingSenderId: "396269034841",
  appId: "1:396269034841:web:ae00bbb8116bc92f180048",
  measurementId: "G-HNDDR0GR8M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
