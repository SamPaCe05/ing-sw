import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@mui/material"; 
import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { fireStore } from "../firebase/firebaseconfig";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { collection, doc, getDoc, getDocs, updateDoc, arrayUnion, query, where } from "firebase/firestore";
export function Addstudent({userDetails}) {
  const username = userDetails && userDetails.username ? userDetails.username : "null"
  const [nameClas, setClassName] = React.useState(""); 
  const [correo, setCorreo] = React.useState(""); 
  const [mensaje, setMensaje] = React.useState("")
  const [ok, setOk] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [clases, setClases] = useState([]);
  useEffect(()=>{
    const fetchClases = async ()=>{
        if(userDetails && userDetails.classes && userDetails.classes.length>0){
            try{
                const classQuery = query(
                    collection(fireStore, "classes"),
                    where("profesor","==",username),
                    where("state","==",true)
                )
                const querySpanshot  = await getDocs(classQuery);
                const clasesData = querySpanshot.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data(),
                }));

                setClases(clasesData)
            }catch(error){
            }
        }
    }
    fetchClases();
  }, [userDetails]);

  const handleAddEstudiante = async () => {
    try {
        const classRef = query(
            collection(fireStore, "usuarios"),
            where("correo", "==", correo)
        );
        const userSnapshot = await getDocs(classRef);

        if (!userSnapshot.empty) {
            const userId = userSnapshot.docs[0].id;

            await updateDoc(doc(fireStore, "usuarios", userId), {
                Clases_Activas: arrayUnion(nameClas)
            });
        } else {
        }
    } catch (error) {
        console.error("Error al agregar la clase al estudiante:", error);
    }

    try{
        const stRef= query(
            collection(fireStore,"classes"),
            where("name","==",nameClas)
        );
        const classSnapshot = await getDocs(stRef);
        if(!classSnapshot.empty){
            const classId = classSnapshot.docs[0].id;
            await updateDoc(doc(fireStore,"classes",classId),{
                Estudiantes_Activos: arrayUnion(correo)
            });
            setAlertType("success")
            setMensaje("Estudiante agregado exitosamente.")
            console.log("Clase agregada exitosamente al usuario.")
        }else{
            setAlertType("error")
            setMensaje("Usuario no encontrado con ese correo.")

        }
    }catch(error){
        setMensaje("No se pudo agregar el estudiante.")
        setAlertType("error")
    }
    setOk(true);
    setCorreo("")
    setClassName("")
    console.log(correo)
};
 

  return (
    <>
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Agregar Estudiante</CardTitle>
        <CardDescription>Complete los datos para agregar el estudiante</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Correo Del Estudiante</Label>
              <Input value={correo} onChange={(e) => setCorreo(e.target.value)} id="name" placeholder="Correo Del Estudiante" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Seleccione una Clase</Label>
              <Select
              value={nameClas}
              onValueChange={(value) => setClassName(value)}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleAddEstudiante}>Agregar</Button>
      </CardFooter>
        {ok && (
                <div className="mt-4 transition-transform transform duration-500 ease-in-out translate-y-4">
                <Alert severity={alertType} onClose={() => setOk(false)}>
                    {mensaje}
                </Alert>
                </div>
        )}
    </Card>
    </>
  );
}
