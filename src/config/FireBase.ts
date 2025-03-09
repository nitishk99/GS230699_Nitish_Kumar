import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
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
export const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in:", user);
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async (auth: any) => {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export default firestore;