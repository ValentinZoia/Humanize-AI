import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/zodSchema";
import { getUserByEmail, validateUserPassword } from "./actions/user";


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
          try {
            const validateFields = loginSchema.safeParse(credentials);
  
          if (!validateFields.success) {
            throw new Error("Por favor, ingresa tu correo y contraseña.");
          }
  
          const { email, password } = validateFields.data;
  
         
          const user = await getUserByEmail(email);
  
          if (!user) {
            throw new Error("Email o contraseña incorrectos.");
          }
  
          
         await validateUserPassword(user, password);
          return user;
          
          } catch (error) {
            console.error('Authentication error:', error);
            return null;
          }
          
          
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




