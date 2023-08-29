import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSHl1hjtst4boX5jFyhXJjSuIV0hCpCiE",
  authDomain: "j4b-movies.firebaseapp.com",
  projectId: "j4b-movies",
  storageBucket: "j4b-movies.appspot.com",
  messagingSenderId: "430632458061",
  appId: "1:430632458061:web:b0426cc2970d854c044904",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
