import React from 'react'
import {Button} from './ui/button'
import {CopyIcon} from 'lucide-react'
import {toast} from 'sonner'
import {copyClipboard} from '@/lib/utils'

interface Props {
    humanizedText:string;                         
    textRef:React.RefObject<HTMLDivElement | null>;
}


const TextGeneratedBox = ({humanizedText,textRef}:Props) => {
  const handleCopy = (text:string) => {
    copyClipboard(text);
    toast.success("Copied to clipboard", {
        description: "The text has been copied to the clipboard.",
        
    });

  }
  
  
    return (
    <div ref={textRef} className="mt-8 p-4 bg-gray-100 rounded-lg relative">
        <h2 className='text-xl font-bold mb-2'>Humanized Text:</h2>
        <p className='text-sm'>{humanizedText}</p>
        <Button 
        variant={"ghost"}
        size={"icon"}
        onClick={()=> handleCopy(humanizedText)}
        className='absolute top-2 right-2 rounded-full shadow-md'
        >
            <CopyIcon className='h-4 w-4' />
            
        </Button>
    </div>
  )
}

export default TextGeneratedBox