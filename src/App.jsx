import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import FormSignin from "./components/FormSignin";
import Navbar from "./components/Navbar"
import FormSignup from "./components/FormSignup";
import { ThemeProvider } from "./components/theme-provider";
import { auth } from "./firebase/firebaseconfig";
import { CreateClass } from "@/components/CreateClass";
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const fireStore = getFirestore();

  useEffect(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    if (savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails)); 
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(fireStore, "usuarios", user.uid);
        const docSnapShot = await getDoc(docRef);
        if (docSnapShot.exists()) {
          const userDetails = docSnapShot.data();
          setUserDetails(userDetails);
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        setUserDetails(null);
        localStorage.removeItem("userDetails"); 
      }
    });
    return () => unsubscribe();
  }, [fireStore]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireStore, 'usuarios'));
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, [fireStore]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Navbar user={userDetails}/>}>
         <Route path="/home/createclass"></Route>
         <Route path="/home/misclases"></Route>

        </Route>
        <Route path="/signin" element={<FormSignin />} />
        <Route path="/signup" element={<FormSignup />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
