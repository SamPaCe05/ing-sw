import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import FormSignin from "./components/FormSignin";
import FormSignup from "./components/FormSignup";
import { auth } from "./firebase/firebaseconfig";
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const fireStore = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(fireStore, "usuarios", user.uid);
        const docSnapShot = await getDoc(docRef);
        if (docSnapShot.exists()) {
          setUserDetails(docSnapShot.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        setUserDetails(null);
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
    <BrowserRouter>
      <Routes>

        <Route path="/signin" element={user ? <Navigate to={"/homeUser"} /> : <FormSignin />} />
        <Route path="/signup" element={<FormSignup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
