import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseconfig";
import { useParams } from 'react-router-dom';

function ClaseDetalle() {
    const [clase, setClase] = useState({});
    const { id } = useParams(); 
    
    useEffect(() => {
        // Asegurarse de que el id sea válido antes de hacer la consulta
        if (id) {
            const fetchClase = async () => {
                try {
                    const docRef = doc(fireStore, "classes", id);
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        setClase({ id: docSnap.id, ...docSnap.data() });
                        console.log("Clase info obtenida correctamente", docSnap.data());
                    } else {
                        console.log("No se encontró la clase con el id", id);
                    }
                } catch (error) {
                    console.log("Error al obtener la clase: ", error);
                }
            };
            fetchClase();
        } else {
            console.log("ID no válido");
        }
    }, [id]);
  
    return (
        <div>
            {clase.problemas && clase.problemas.length > 0 ? (
                clase.problemas.map((problema) => (
                        <button
                            key={problema.id}
                            style={{
                                fontSize: "24px", 
                                padding: "15px 25px",
                                margin: "10px 0",
                                width: "100%", 
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px", 
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease", 
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#0056b3";
                                e.target.style.transform = "scale(1.05)"; 
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#007bff"; 
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            {problema.problemName}
                        </button>
                ))
            ) : (
                <p>No tienes clases activas.</p>
            )}
        </div>
    );
}

export default ClaseDetalle;
