import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='container max-w-5xl left-1/2 -translate-x-1/2 fixed z-10 top-4'>
      <header className='flex justify-between items-center min-h-16 bg-background/95 backdrop-blur
      supports-[backdrop-filter]:bg-background/60 dark:border rounded-xl px-4 py-3 shadow-lg'> 
        <Link href={'/'}>
        <h1 className='text-2xl font-bold'>Humanizer</h1>
        </Link>
        
      </header>

    </div>
    
  )
}

export default Header