"use client";

import { getUserTextTransformations } from "@/actions/user";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { handleCopy } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { text } from "stream/consumers";


const ProfilePage = () => {
  const [textTransformations, setTextTransformations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    const fetchTextTransformations = async () => {
      try {
        const transformations = await getUserTextTransformations();
        setTextTransformations(transformations);
      } catch (error) {
        console.error("Error fetching text transformations:", error);
        toast.error("Failed to fetch text transformations");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTextTransformations();
  },[]);
  
  return (
    <main className="w-full pt-24 pb-8">
      <section className="container flex-1 flex flex-col items-center py-16">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Profile</h1>

        {isLoading ? (
          <Loader />
        ) :
        textTransformations.length === 0 ? (
          <EmptyState />
        ) :(
          textTransformations.map((text, index)=>(
            <Card className="max-w-4xl mx-auto mt-4 w-full relative" key={index}>
              <CardContent className="pt-6">
                <p className="text-sm">{text}</p>
              </CardContent>
              <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => handleCopy(text)}
              className="absolute top-2 right-2 rounded-full shadow-md"
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </Card>
          ))
        )
        }
      </section>

    </main>
  )
}

export default ProfilePage