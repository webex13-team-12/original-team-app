import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEDeqJiHKILd4Zr3prTn1kwAjfqjsRDx4",
  authDomain: "tweet-d0c5b.firebaseapp.com",
  projectId: "tweet-d0c5b",
  storageBucket: "tweet-d0c5b.appspot.com",
  messagingSenderId: "350582898032",
  appId: "1:350582898032:web:c6c148d51b46abbaaea3b5",
  measurementId: "G-71MMGCJRRN",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
