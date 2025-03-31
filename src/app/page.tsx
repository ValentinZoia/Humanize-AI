import { auth } from "@/auth";
import TextBox from "@/components/TextBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const session = await auth();
  
  
  return (
    <main className="w-full py-24 pb-8">
      <div className="container flex-1 flex flex-col items-center text-center space-y-4 py-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ">
            Humanize IA Generated Content
            </h1>
            <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl dark:text-gray-400">
              Humanizer is a tool that helps you humanize AI generated content.
              It uses a combination of AI and human intelligence to help you
              create content that sound more human.
            </p>
          
        </div>
        {!session && (
          <Link href="/login">
            <Button size={"lg"}  variant={"default"} className="cursor-pointer w-full max-w-48">Get Started</Button>
          </Link>
        )}
      </div>
      <div className="container max-w-5xl">
        
        <TextBox />
      </div>
    </main>
  );
};

export default Home;
