"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

interface Props {
    name:string;
    isLoading:boolean;
}

const SubmitBtn = ({name, isLoading}:Props) => {
  return (
    <Button disabled={isLoading} className={cn("w-full", isLoading && "opacity-50 cursor-not-allowed")} type="submit">
      {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : name}
    </Button>
  )
}

export default SubmitBtn