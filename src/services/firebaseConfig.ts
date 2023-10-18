import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCc1qUfW2qheqjMrqtbLFF6n1YyiMygriA",
  authDomain: "sgardoc-instic-2023.firebaseapp.com",
  projectId: "sgardoc-instic-2023",
  storageBucket: "sgardoc-instic-2023.appspot.com",
  messagingSenderId: "568662730469",
  appId: "1:568662730469:web:034e462901972de1b0560c",
  measurementId: "G-6J0C2C888Z",
});

const storage = getStorage(firebaseConfig);
export default storage;
