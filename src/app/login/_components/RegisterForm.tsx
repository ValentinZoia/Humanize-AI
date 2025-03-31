"use client";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver} from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import SubmitBtn from "@/components/Register/SubmitBtn";
import { toast} from 'sonner';
import { useRouter } from 'next/navigation';
import { SignUpFormSchema } from '@/lib/zodSchema';
import { registerWithCredentials} from "../actions";

type FormValues = z.infer<typeof SignUpFormSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  });

  const onSubmit = async (FormData: FormValues) => {
    setIsLoading(true);
    try {
      const result = await registerWithCredentials(FormData.name, FormData.email, FormData.password);
      if (result.success) {
        toast.success("User created successfully", {
          description: "You are now registered",
        });
        router.push("/");
      }else{
        toast.error("Registration Error", {
          description: result.error,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration", {
        description: "Please try again later",
      });
    } finally{
      setIsLoading(false);
    }
  };




  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitBtn name="Register" isLoading={isLoading} />

      </form>
    </Form>
  )
}

export default RegisterForm