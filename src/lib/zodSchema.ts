import { z } from "zod";

//para TextBox.tsx
export const textSchema = z.object({
  text: z
    .string()
    .min(32, "Text must be at least 32 characters long")
    .max(1000, "Text must be at most 1000 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(2).max(32),
  password:z.string().min(1, "Invalid password").max(32),

});

export const SignUpFormSchema = z
  .object({
    email: z
    .string()
    .min(1, { message: "This field cant be empty" })
    .email({ message: "Invalid email" })
    .trim(),
  name: z
    .string()
    .min(1, { message: "This field cant be empty" })
    .max(30, { message: "Username must be less than 30 characters" })
    .trim(),
  
  password: z
    .string()
    .min(1, { message: "This field cant be empty" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .trim(),

    
  })