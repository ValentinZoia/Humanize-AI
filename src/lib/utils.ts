import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getEmailInitial = (name: string) => {
  return name.split(' ').map((n) => n[0] + n[1]).join('').toUpperCase();
}

export const copyClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
}

export const handleCopy = (text: string) => {
  copyClipboard(text)
  toast.success("Copied to clipboard", {
    description:"The humanized text has been copied to your clipboard"
  })
}
