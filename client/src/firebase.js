// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dfc91.firebaseapp.com",
  projectId: "mern-blog-dfc91",
  storageBucket: "mern-blog-dfc91.firebasestorage.app",
  messagingSenderId: "161363151203",
  appId: "1:161363151203:web:002126b5d21410ca68ab56",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
