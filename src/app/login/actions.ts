"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/actions/user";


export const login = async (provider: string) =>{
    try {
        await signIn(provider, { redirect: false });
    } catch (error) {
        if (error instanceof AuthError) {
            console.error("Authentication error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export const logout = async () =>{
    try {
        await signOut({ redirectTo: "/login" });
    } catch (error) {
        if (error instanceof AuthError) {
            console.error("Authentication error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export const loginWithCredentials = async (email: string, password: string) =>{
    try {
        await signIn("credentials",{email, password, redirect: false});
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type){
                case "CredentialsSignin":
                    throw new Error("Invalid email or password");
                default:
                    throw new Error("An error occurred during login");
            
            }
        } else {
            console.error("Unexpected error:", error);
        }
        
    }
};

export const registerWithCredentials = async (name: string, email: string, password: string) =>{
    try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
            return {success:false, error:"User already exists"};
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await prisma.user.create({
            data:{
                email,
                name, 
                password: hashedPassword,
            }
        });

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if(result?.error){
            return {success:false, error:result.error};
        }
        return {success:true};


    } catch (error) {
        console.error(error);
        return { success: false, error: "An unexpected error occurred" };
    }
};

