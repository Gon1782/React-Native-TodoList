import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUFb92DyPxkS0CrtXD1qs3wvyUEWyWaBM",
  authDomain: "react-native-todo-2707e.firebaseapp.com",
  projectId: "react-native-todo-2707e",
  storageBucket: "react-native-todo-2707e.appspot.com",
  messagingSenderId: "872761079851",
  appId: "1:872761079851:web:55fa12c029e192f4d0526e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
