import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fireStore } from "../firebase/firebaseconfig"; 
import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore"; 

import { getAuth } from "firebase/auth"; 
export function CreateClass() {
  const [className, setClassName] = React.useState(""); 

  const handleInputChange = (e) => {
    setClassName(e.target.value); 
  };

  const createClass = async () => {
    try {
      const classCollection = collection(fireStore, "classes"); 

      const docRef = await addDoc(classCollection, {
        name: className, 
        createdAt: new Date(), 
      });

      console.log("Clase creada con ID: ", docRef.id); 

      const auth = getAuth();
      const user = auth.currentUser; 
      console.log("id->",user.uid)
      if (user) {
        const userDocRef = doc(fireStore, "usuarios", user.uid);
        await updateDoc(userDocRef, {
          classes: arrayUnion(docRef.id) 
        });
        

        console.log("El ID de la clase se ha agregado al usuario con UID: ", user.uid);
      } else {
        console.log("No hay un usuario autenticado.");
      }
    } catch (e) {
      console.error("Error al crear la clase: ", e);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crear Clase</CardTitle>
        <CardDescription>Ingrese un nombre de clase</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Class Name</Label>
              <Input 
                id="name" 
                placeholder="nombre de su clase..." 
                value={className} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={createClass}>Crear</Button>
      </CardFooter>
    </Card>
  );
}
