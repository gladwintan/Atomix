// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW5q4g8ae4NA8cI-Se-K71TNgnDWCitVE",
  authDomain: "atomix-f7f13.firebaseapp.com",
  projectId: "atomix-f7f13",
  storageBucket: "atomix-f7f13.firebasestorage.app",
  messagingSenderId: "87125540879",
  appId: "1:87125540879:web:4e3965569bdbce7329e37a",
  measurementId: "G-VZZ39B8JRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { app, db}