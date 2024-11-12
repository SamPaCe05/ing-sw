import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDoyzIF-L3m-fZ8rmURyP_QEduLDPYNOLY",
    authDomain: "test2-c60cb.firebaseapp.com",
    projectId: "test2-c60cb",
    storageBucket: "test2-c60cb.firebasestorage.app",
    messagingSenderId: "250265583291",
    appId: "1:250265583291:web:1d88fb1038ff3ad986739e"
  };

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase); 
const fireStore = getFirestore(appFirebase); 

export { appFirebase, auth, fireStore };