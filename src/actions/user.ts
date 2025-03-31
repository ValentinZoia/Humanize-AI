"use server";//recordar siempre

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import {User} from '@prisma/client';

export async function validateUserPassword(user: User, password: string) {
    if(!user.password){
        throw new Error("User does not have a password set.");
    }
    // Check if the password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password.");
    }
    return true;
}

export async function getUserByEmail(email:string){
    const user = await prisma.user.findUnique({
        where: { email },
      });
      if(!user){
        return null;
      }
      return user
}

export async function setHumanizedText(userEmail:string, originalText: string, humanizedText:string): Promise<void>{
    const user = await getUserByEmail(userEmail);
    if(!user){
        throw new Error("User not found.");
    }
    try {
        //guardamos el texto original y el texto humanizado en la base de datos
        await prisma.textTransformation.create({
            data: {
                userId: user.id,
                originalText,
                humanizedText,
            },
        })
    } catch (error) {
        console.error(error)
        throw new Error("Error creating text transformation.");
    }
}

export async function isLoggedIn(): Promise<boolean>{
    const session = await auth();
    return !!session;
}

export async function getUserTextTransformations(): Promise<string[]>{
    //verificar si el usuario esta loggeado
    const session = await auth();
    if(!session || !session.user || !session.user.email){
        throw new Error("User not logged in.");
    }

    const user = await getUserByEmail(session.user.email);

    if(!user){
        throw new Error("User not found.");
    }

    const textTransformations = await prisma.textTransformation.findMany({
        where: {
            userId: user.id,
        },
    });

    return textTransformations.map(t => t.humanizedText);
}

