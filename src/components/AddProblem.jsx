import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@mui/material"; 
import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { fireStore } from "../firebase/firebaseconfig";
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion, query, where } from "firebase/firestore";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AddProblem({userDetails}) {
    const navigate = useNavigate();

    const testCasesJson = `{
        "test_cases": [
          {
            "input": "5\\n1 2 3 4 5\\n",
            "output": "15\\n"
          },
          {
            "input": "3\\n10 20 30\\n",
            "output": "60\\n"
          },
          {
            "input": "4\\n1 2 3 4\\n",
            "output": "10\\n"
          },
          {
            "input": "6\\n5 10 15 20 25 30\\n",
            "output": "105\\n"
          },
          {
            "input": "1\\n100\\n",
            "output": "100\\n"
          },
          {
            "input": "2\\n2 3\\n10 5\\n",
            "output": "20\\n"
          }
        ]
      }`;

    const username = userDetails && userDetails.username ? userDetails.username : "null";
    const [className, setClassName] = useState("");  
    const [problemName, setProblemName] = useState(""); 
    const [problemDescription, setProblemDescription] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [outputDescription, setOutputDescription] = useState("");
    const [inputExample, setInputExample] = useState("");
    const [outputExample, setOutputExample] = useState("");
    const [testCases, setTestCases] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [ok, setOk] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [clases, setClases] = useState([]);

    const handleInputChange = (e) => {
        setClassName(e.target.value);  
    };

    useEffect(() => {
        const fetchClases = async () => {
            if (userDetails && userDetails.classes && userDetails.classes.length > 0) {
                try {
                    const classQuery = query(
                        collection(fireStore, "classes"),
                        where("profesor", "==", username),
                        where("state", "==", true)
                    );
                    const querySnapshot = await getDocs(classQuery);
                    const clasesData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setClases(clasesData);
                } catch (error) {
                    console.error("Error al obtener las clases:", error);
                }
            }
        };

        fetchClases();
    }, [userDetails]);

    const handleAddProblem = async () => {
        try{
            const classRef = query(
                collection(fireStore, "classes"),
                where("name","==",className)
            );
            const classSnapshot = await getDocs(classRef);
            if(!classSnapshot.empty){
                const classDoc = classSnapshot.docs[0];
                const classId = classDoc.id;
                const newProblem = {
                    problemName,
                    className,
                    problemDescription,
                    inputDescription,
                    outputDescription,
                    inputExample,
                    outputExample,
                    testCases: JSON.parse(testCases) 
                };
                await updateDoc(doc(fireStore, "classes", classId), {
                    problemas: arrayUnion(newProblem), 
                });
                console.log("Problema agregado con éxito a la clase:", className);
            }else{
                console.log("Clase no encontrada con ese nombre.");
            }
        }catch(error){
            console.error("Error al agregar el problema:", error);
        }
        setClassName("")
        setProblemName("")
        setProblemDescription("")
        setInputDescription("")
        setOutputDescription("")
        setInputExample("")
        setOutputExample("")
        setTestCases("")
    };

    return (
        <>
            <Card className="w-[100%]">
                <CardHeader className="flex justify-center">
                    <CardTitle className="text-center">Agregar Problema</CardTitle>
                    <CardDescription className="text-center">Termine de completar todos los campos para agregar un problema</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3" htmlFor="name">Nombre Del Problema</Label>
                                <Input
                                    className="w-[30%] mx-auto"
                                    id="name"
                                    placeholder="nombre del problema..."
                                    value={problemName}
                                    onChange={(e) => setProblemName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3 mt-4" htmlFor="framework">Seleccione una clase para agregar el problema</Label>
                                <Select 
                                    value={className}  // Usamos el valor del estado className
                                    onValueChange={(value) => setClassName(value)}  // Actualizamos el valor del select
                                >
                                    <SelectTrigger className="w-[30%] mx-auto" id="framework">
                                        <SelectValue placeholder="Seleccione una clase" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {clases.length > 0 ? (
                                            clases.map((clase) => (
                                                <SelectItem key={clase.id} value={clase.name}>{clase.name}</SelectItem>
                                            ))
                                        ) : (
                                            <p>No tienes clases activas.</p>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3" htmlFor="problemDescription">Descripcion del problema</Label>
                                <Textarea
                                    className="min-h-[400px]"
                                    placeholder="Describa el problema"
                                    value={problemDescription}
                                    onChange={(e) => setProblemDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3" htmlFor="inputDescription">Input Descripcion</Label>
                                <Textarea
                                    className="min-h-[200px] w-[60%] mx-auto"
                                    placeholder="Describa el Input del problema, los valores > y < para cada variable de entrada"
                                    value={inputDescription}
                                    onChange={(e) => setInputDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3" htmlFor="outputDescription">Output Descripcion</Label>
                                <Textarea
                                    className="min-h-[200px] w-[60%] mx-auto"
                                    placeholder="Describa la salida esperada y como debe estar estructurada"
                                    value={outputDescription}
                                    onChange={(e) => setOutputDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3" htmlFor="inputExample">Example</Label>
                                <Label className="text-center mb-3" htmlFor="inputExample">Input Example</Label>
                                <Textarea
                                    className="min-h-[200px] w-[60%] mx-auto"
                                    placeholder="Input Example"
                                    value={inputExample}
                                    onChange={(e) => setInputExample(e.target.value)}
                                />
                                <Label className="text-center mb-3" htmlFor="outputExample">Output Example</Label>
                                <Textarea
                                    className="min-h-[200px] w-[60%] mx-auto"
                                    placeholder="Output Example"
                                    value={outputExample}
                                    onChange={(e) => setOutputExample(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-center mb-3" htmlFor="testCases">Casos De Prueba Formato json</Label>
                                <p className="leading-7 [&:not(:first-child)]:mt-6">
                                    Ejemplo:
                                </p>
                                <pre className="bg-gray-900 text-white p-4 rounded dark:bg-gray-800 dark:text-white">{testCasesJson}</pre>
                                <Textarea
                                    className="min-h-[200px] mx-auto"
                                    placeholder="Ingrese los casos de prueba en formato json como se muestra en el ejemplo recuerde que puede expandir el text-area con el boton que se encuentra en la parte inferior derecha"
                                    value={testCases}
                                    onChange={(e) => setTestCases(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => navigate("/home")} variant="outline">Cancelar</Button>
                    <Button onClick={handleAddProblem}>Agregar</Button>
                </CardFooter>
            </Card>
        </>
    );
}
