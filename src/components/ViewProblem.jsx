import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseconfig";

function ViewProblem() {
    const { id, problemName } = useParams(); 
    const [problema, setProblema] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const docRef = doc(fireStore, "classes", id);  
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const clase = docSnap.data();
                    const problemaEncontrado = clase.problemas.find(problema => problema.problemName === problemName);
                    
                    if (problemaEncontrado) {
                        setProblema(problemaEncontrado);
                    } else {
                        console.log("No se encontró el problema.");
                    }
                } else {
                    console.log("No se encontró la clase.");
                }
            } catch (error) {
                console.log("Error al obtener el problema:", error);
            }
        };

        if (id && problemName) {
            fetchProblem();
        }
    }, [id, problemName]); 
    useEffect(() => {
        if (problema) {
            console.log("Problema obtenido", problema);
        }
    }, [problema]);  

    return (
        <div>
            {problema ? (
                <div>
                    <h1>{problema.problemName}</h1>
                    <h2>Descripción</h2>
                    <p>{problema.description}</p>
                    <h3>Entrada</h3>
                    <pre>{problema.input}</pre>
                    <h3>Salida</h3>
                    <pre>{problema.output}</pre>
                </div>
            ) : (
                <p>Cargando detalles del problema...</p>
            )}
        </div>
    );
}

export default ViewProblem;
