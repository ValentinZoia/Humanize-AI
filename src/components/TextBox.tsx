"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { LoaderCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {isLoggedIn} from '@/actions/user'
import {humanizeText} from '@/actions/openai';
import { textSchema } from "@/lib/zodSchema";
import { cn } from "@/lib/utils";
import TextGeneratedBox from "./TextGeneratedBox";

export default function TextBox() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [text, setText] = useState<string | null>("");

  const textRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: {
      text: "",
    },
  });

  const { watch, setValue } = form;

  const textValue = watch("text");

  useEffect(() => {
    //seteamos la longitud de caracteres que tiene el texto.
    setCharCount(textValue.length);

    //separamos todas las letras del texto en un array.
    const words = textValue
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
      //guardamos la cantidad de letras.
    setWordCount(textValue.length > 0 ? words.length : 0);
  }, [textValue]);

  useEffect(() => {
    if (text && textRef.current) {
      setTimeout(() => {
        textRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [text]);

  //limpiar form
  const handleClear = () => {
    setValue("text", "");
    setText(null);
    setIsLoading(false);
  };

  const onSubmit = async ({text}:z.infer<typeof textSchema>) =>{
    setIsLoading(true);
    //verificamos si el usuario esta logueado
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
        toast.error("You need to be logged in to humanize text",{
            description: "Please log in to continue",
        });
        setIsLoading(false);
        return;
    }

    try {
        const result = await humanizeText(text);
        if (result) {
            setText(result);
            setIsLoading(false);
        }
        else {
            toast.error("Something went wrong, please try again later");
            setIsLoading(false);
        }



    } catch (error) {
        toast.error("Something went wrong, please try again later",{
            description: "Error: " + error,
        });
        setIsLoading(false);
    } finally{
        setIsLoading(false);
    }

  }

  return(

    <Card className="w-full shadow-lg">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <CardHeader className="pb-4">
                    <div className="space-x-2">
                        <Button type="button" className="text-xs h-8" variant={"outline"}>ChatGPT</Button>

                        <Button disabled className="text-xs h-8" variant={"outline"}>Claude</Button>
                        <Button disabled className="text-xs h-8" variant={"outline"}>Llama</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                    <Textarea
                                        placeholder="Enter your text here..."
                                        className="min-h-[200px] pr-10"
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant={"ghost"}
                                        size={"icon"}
                                        className="absolute right-2 top-2"
                                        onClick={handleClear}
                                    >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Clear Text</span>
                                    </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={cn("mt-2 text-sm text-muted-foreground", charCount > 1000 ? "text-red-500" : "")} >
                        Characters: {charCount} Words: {wordCount}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between" >
                <div>
                    {charCount > 0 && `${1000 - charCount} characters remaining`}
                </div>
                <Button disabled={isLoading} type="submit" className="h-10 flex items-center gap-2" variant={"outline"}>
                            {isLoading ? <><LoaderCircle className="animate-spin size-6" /><span>Humanizing...</span></> : "Humanize"}

                </Button>
                </CardFooter>
            </form>

        </Form>
            {text && (
                <TextGeneratedBox humanizedText={text} textRef={textRef}/>
            )}
    </Card>
  ); 
  
  
}
