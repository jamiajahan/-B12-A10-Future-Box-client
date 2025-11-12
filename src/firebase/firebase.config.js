// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtyA4Sw6uRX4TxeUetrbH17JlpJnFpVpQ",
  authDomain: "community-cleanliness-ea74c.firebaseapp.com",
  projectId: "community-cleanliness-ea74c",
  storageBucket: "community-cleanliness-ea74c.firebasestorage.app",
  messagingSenderId: "805209697903",
  appId: "1:805209697903:web:4b3cb8346519ce507ee79a",
  measurementId: "G-N3113FZBZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);