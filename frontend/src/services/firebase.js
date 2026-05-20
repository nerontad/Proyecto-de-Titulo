// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmyAxFZw5rWtc6g0l88fdgSSh0yHSqCpk",
  authDomain: "detector-incendios-a43bd.firebaseapp.com",
  projectId: "detector-incendios-a43bd",
  storageBucket: "detector-incendios-a43bd.firebasestorage.app",
  messagingSenderId: "270150755025",
  appId: "1:270150755025:web:fdf8449de274321faf1bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app