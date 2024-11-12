import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyD1-fiTldjgqm2BZFtIxP0Fe2Mf0ohDmp8",
    authDomain: "alasicas-3793a.firebaseapp.com",
    projectId: "alasicas-3793a",
    storageBucket: "alasicas-3793a.appspot.com",
    messagingSenderId: "278872603537",
    appId: "1:278872603537:web:fb6d064adc7d7cf65f3830"
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase); 
const fireStore = getFirestore(appFirebase); 

export { appFirebase, auth, fireStore };