import "./MisClases.css"
import React, { useEffect, useState } from 'react';
import CardClass from "./ActionAreaCard.jsx"
import { collection, getDocs, query, where} from "firebase/firestore";
import { fireStore } from "../firebase/firebaseconfig";
const MisClases = ({user}) => {
    const username = user && user.username ? user.username : "null";
    const [clases, setClases] = useState([])
    useEffect(() => {
        const fetchClases = async () => {
          if (user && user.classes && user.classes.length > 0) {
            try {
              const clasesQuery = query(
                collection(fireStore, "classes"),
                where("profesor","==",username),
                where("state","==",true),
              );
              const querySnapshot = await getDocs(clasesQuery);
              const clasesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
    
              setClases(clasesData);
            } catch (error) {
              console.error("Error al obtener las clases: ", error);
            }
          }
        };
    
        fetchClases();
        console.log(clases)
      }, [user]);
  return (
    <div className="MisClases-card">
      {clases.length > 0 ? (
        clases.map((clase) => (
          <CardClass nombreClase={clase.name} fechaCreacion={clase.createdAt} />
        ))
      ) : (
        <p>No tienes clases activas.</p>
      )}
    </div>
  )
}

export default MisClases
