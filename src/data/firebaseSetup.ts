// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCm1iZIPjASPZh9AXi1D-8qoSORqfEFixM",
  authDomain: "doggoneedle.firebaseapp.com",
  projectId: "doggoneedle",
  storageBucket: "doggoneedle.appspot.com",
  messagingSenderId: "66980404913",
  appId: "1:66980404913:web:be52680d1955b57fc94c90",
  measurementId: "G-1EY9J5GS0S"
};


// Initialize Firebase  
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
