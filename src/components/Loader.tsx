import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
    <LoaderCircle className='size-8 animate-spin' />
  </div>
  )
}

export default Loader