// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8b69b.firebaseapp.com",
  projectId: "mern-auth-8b69b",
  storageBucket: "mern-auth-8b69b.appspot.com",
  messagingSenderId: "839819439127",
  appId: "1:839819439127:web:9344be52ac1ff239ed8052"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
