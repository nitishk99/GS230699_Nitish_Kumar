import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl2tqk9JWqQBDA0M8Dg0jWwywTA7HGRSM",
  authDomain: "gsynergy-23.firebaseapp.com",
  projectId: "gsynergy-23",
  storageBucket: "gsynergy-23.firebasestorage.app",
  messagingSenderId: "400708574044",
  appId: "1:400708574044:web:88f13a2cdcd54d1989bf99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore;
