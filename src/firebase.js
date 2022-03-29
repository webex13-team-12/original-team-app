// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKCINrJZYlXyu4nFP8UipUGkSXK28vLHg",
  authDomain: "knobsalmonproject.firebaseapp.com",
  projectId: "knobsalmonproject",
  storageBucket: "knobsalmonproject.appspot.com",
  messagingSenderId: "592330708412",
  appId: "1:592330708412:web:74089c109f7e34767d07b9",
  measurementId: "G-EQEX0YZHGW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
