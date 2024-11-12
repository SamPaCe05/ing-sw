import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { auth } from '../firebase/firebaseconfig.js'
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


//!FORM
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// !Definición del esquema de validación
const formSchema = z.object({

  email: z.string().email("Dirección de correo inválida").min(1, "El correo es obligatorio"),
  password: z.string()
    .min(8, { message: "La contraseña debe contener minimo 8 caracteres" })
    .max(16, { message: "La contraseña no puede ser mayor a 16 caracteres" })
    .regex(/[0-9]/, { message: "debe contener al menos un número" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
    .regex(/[@$!%*?&#]/, { message: "Debe contener al menos un caracter especial" }),

})

//!
//!
//!

export default function FormSignin() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  async function onSubmit(values) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      window.location.href = "/home";
      toast.success("Iniciando Sesión", {
        position: "top-center",
      });
      setTimeout(() => {

      }, 1500);
    } catch (error) {
      console.log(error.message);

      toast.error("Usuario o  Contraseña Incorrectos", { 
        position: "bottom-center", 
        autoClose: 2000
      });

    }
  }
  return (
    <div className="flex justify-center  w-72  mobile:w-96 mx-auto items-center ">


      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (

                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********"  {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>

              )}
            >

            </FormField>
            <FormDescription>
              <Link className="text-blue-600 border-b border-blue-400 " to={'/signup'}>Crear una cuenta</Link>
            </FormDescription>
            <Button type="submit">Ingresar</Button>
          </form>
        </Form>
      </div>

    </div>
  )
}
