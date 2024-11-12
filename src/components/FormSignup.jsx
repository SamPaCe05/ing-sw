import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from "react-router-dom"
import { appFirebase } from "../firebase/firebaseconfig"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(appFirebase)
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button"
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


const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "El nombre del usuario debe contener al menos 2 caracteres" })
    .max(20, { message: "El nombre del usuario no debe tener más de 20 caracteres" }),
  email: z.string().email("Dirección de correo inválida").min(1, "El correo es obligatorio"),
  password: z.string()
    .min(8, { message: "La contraseña debe contener minimo 8 caracteres" })
    .max(16, { message: "La contraseña no puede ser mayor a 16 caracteres" })
    .regex(/[0-9]/, { message: "debe contener al menos un número" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
    .regex(/[@$!%*?&#]/, { message: "Debe contener al menos un caracter especial" }),
  confirmPassword: z.string().min(8, { message: "Confirma tu contraseña" }),
  rol: z.string()

}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export default function FormSignup() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rol: "user"
    },
  })

  const fireStore = getFirestore(appFirebase);


  function onSubmit(values) {
    registrarUsuario(values)
  }


  async function registrarUsuario(values) {
    try {
      const userCredencial = await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log("holaaa")
      console.log(userCredencial);

      const docRef = doc(fireStore, `/usuarios/${userCredencial.user.uid}`);
      await setDoc(docRef, { correo: values.email, username: values.username, rol: values.rol });
      
      toast.success('Usuario Registrado', {
        position: "top-right",
        autoClose: 2000

      });

      return navigate("/home");
    } catch (error) {
      toast.error(`Correo Electronico en Uso`, {
        position: "top-right",
        autoClose: 2000

      });
      throw new Error(error);
    }
  }

  return (
    <div className="flex  justify-center h-full w-72  mobile:w-96 mx-auto items-center ">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu Nombre de Usuario " {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es tu nombre público.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormDescription>Usa al menos 8 caracteres con letras, números y caracteres especiales.</FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>

              )}
            >

            </FormField>
            <FormField
              control={form.control}
              name={"confirmPassword"}
              render={({ field }) => (

                <FormItem className>
                  <FormLabel>Confirma tu contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********"  {...field} />
                  </FormControl>
                  <FormDescription>Vuelve a ingresar tu contraseña para confirmar</FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>

              )}
            >

            </FormField>
            <FormDescription >

              <Link className="text-blue-600 border-b border-blue-400 " to={"/signin"}>Ya tengo una cuenta</Link>

            </FormDescription>


            <Button type="submit">Registrar</Button>

          </form>
        </Form>
      </div>

    </div>
  )
}
