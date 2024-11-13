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
  const [className, setClassName] = React.useState(""); 
  const [mensaje, setMensaje] = React.useState("")
  const [ok, setOk] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  
  const handleInputChange = (e) => {
    setClassName(e.target.value); 
  };

  const createClass = async () => {
    
    if(className==""){
      setAlertType("info");
      setOk(true)
      setMensaje("Ingrese un nombre de clase valido");
      return;
    }
    try {
      const classCollection = collection(fireStore, "classes"); 

      const docRef = await addDoc(classCollection, {
        name: className, 
        createdAt: new Date(),
        profesor: username,
        state:true,
      });

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(fireStore, "usuarios", user.uid);
        await updateDoc(userDocRef, {
          classes: arrayUnion(docRef.id),
          state: true
        });
        setMensaje(`Clase creada con exito`);
        setAlertType("success");
        setOk(true);
      } else {
        setMensaje("No hay un usuario autenticado.");
        setAlertType("warning");
        setOk(true);
      }
    } catch (e) {
      setAlertType("error")
      setMensaje(`Error al crear la clase: ${e.message}`);
      setOk(true); 
    }
    
    setClassName("")
  };

  return (
    <>
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </>
  );
}
