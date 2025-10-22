// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCajqoregmFjP6uVUZ9cLcWNQ-NgEzD8a0",
  authDomain: "commit-b7942.firebaseapp.com",
  projectId: "commit-b7942",
  storageBucket: "commit-b7942.firebasestorage.app",
  messagingSenderId: "71009794115",
  appId: "1:71009794115:web:39bea90b012901a688bcf6",
  measurementId: "G-Y7BXBY0Y2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

