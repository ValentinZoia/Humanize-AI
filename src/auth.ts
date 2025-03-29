import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions ={
providers:[
    Github({
        clientId: process.env.AUTH_GITHUB_ID as string,
        clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      }),

      Credentials({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials) {
          // Validación de campos usando Zod
        //   const validateFields = LogInFormSchema.safeParse(credentials);
  
        //   if (!validateFields.success) {
        //     throw new Error("Por favor, ingresa tu correo y contraseña.");
        //   }
  
        //   const { email, password } = validateFields.data;
  
          // Buscar usuario en la base de datos
        //   const user = await prisma.user.findUnique({
        //     where: { email },
        //   });
  
        //   if (!user) {
        //     throw new Error("Email o contraseña incorrectos.");
        //   }
  
          // Si el usuario se registró con OAuth, no permitir login con password
        //   if(!user.password){
        //     return null;
        //   }
          
          // Verificar contraseña
        //   const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     user.password as string
        //   );
  
        //   if (!isPasswordCorrect) {
        //     throw new Error("La contraseña no es correcta.");
        //   }
  
          // Retornar datos básicos del usuario
        //   return {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //   };
        },
      }),
],

}

export const { handlers, signIn, signOut, auth} = NextAuth({
    
    callbacks:{},
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // Sesión dura 30 días
    ...authOptions,
});




