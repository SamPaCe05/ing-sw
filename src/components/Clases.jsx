import "./MisClases.css"
import React, { useEffect, useState } from 'react';
import CardClass from "./ActionAreaCard.jsx"
import { collection, getDocs, query, where} from "firebase/firestore";
import { fireStore } from "../firebase/firebaseconfig";
import { useNavigate } from 'react-router-dom';

const Clases = ({user}) => {
    const navigate = useNavigate();
    const username = user && user.username ? user.username : "null";
    const correo = user && user.correo ? user.correo : "null";
    const [clases, setClases] = useState([])
    const handleClick = (id) =>{
        console.log(`Navigating to /home/clases/${id}`);
        navigate(`/home/clases/${id}`);
    };
    useEffect(() => {
        const fetchClases = async () => {
          if (user && user.Clases_Activas && user.Clases_Activas.length > 0) {
            try {
              const clasesQuery = query(
                collection(fireStore, "classes"),
                where("Estudiantes_Activos","array-contains",correo),
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
        console.log("->",clases)
        console.log("->",correo)

      }, [user]);
  return (
    <div className="MisClases-card">
      {clases.length > 0 ? (
        clases.map((clase) => (
          <CardClass onClick={()=> handleClick(clase.id)} key={clase.id} nombreClase={clase.name} fechaCreacion={clase.createdAt} />
        ))
      ) : (
        <p>No tienes clases activas.</p>
      )}
    </div>
  )
}

export default Clases
