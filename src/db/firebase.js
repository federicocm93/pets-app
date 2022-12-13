// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxslaqA9D3RlVhKYOgenTaeHZkIMnSVXA",
  authDomain: "pets-97bc5.firebaseapp.com",
  projectId: "pets-97bc5",
  storageBucket: "pets-97bc5.appspot.com",
  messagingSenderId: "513807483940",
  appId: "1:513807483940:web:27891fe11fa276a8b744b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
