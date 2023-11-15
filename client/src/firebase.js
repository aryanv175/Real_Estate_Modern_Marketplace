// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-project-e3de2.firebaseapp.com",
  projectId: "real-estate-project-e3de2",
  storageBucket: "real-estate-project-e3de2.appspot.com",
  messagingSenderId: "510307888797",
  appId: "1:510307888797:web:f0340a7ea8383ad32b6e74"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);