import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@mui/material"; 
import { getAuth } from "firebase/auth"; 
import React, { useEffect, useState } from 'react';
import CardClass from "./ActionAreaCard.jsx"
import { collection, getDoc, getDocs, query, where} from "firebase/firestore";
import { fireStore } from "../firebase/firebaseconfig";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export function AddProblem({userDetails}) {
  const username = userDetails && userDetails.username ? userDetails.username : "null"
  const [className, setClassName] = React.useState(""); 
  const [mensaje, setMensaje] = React.useState("")
  const [ok, setOk] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [clases, setClases] = useState([])
  const handleInputChange = (e) => {
    setClassName(e.target.value); 
  };
  useEffect(()=>{
    const fetchClases  = async ()=>{
        if(userDetails && userDetails.classes && userDetails.classes.length > 0 ){
            try{
                const classQuery = query(
                    collection(fireStore, "classes"),
                    where("profesor","==",username),
                    where("state","==",true)
                );
                const querySnapshot = await getDocs(classQuery);
                const clasesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  setClases(clasesData)

            }catch(error){
                console.error("error al obtener las clases ->", error)
            }
        }
    }
    console.log("USER DETAILS->")
    console.log(userDetails)
    fetchClases();
    console.log("clases->")
    console.log(clases)
  }, [userDetails]);

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
                <Input className="w-[30%] mx-auto" id="name" placeholder="nombre del problema..." />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label className="text-center mb-3 mt-4" htmlFor="framework">Seleccione una clase para agregar el problema</Label>
                <Select >
                    <SelectTrigger  className="w-[30%] mx-auto" id="framework">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    {clases.length > 0 ? (
                        clases.map((clase) => (
                            <SelectItem value={clase.name}>{clase.name}</SelectItem>
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
            <Button>Agregar</Button>
        </CardFooter>
        </Card>
    </>
  );
}
