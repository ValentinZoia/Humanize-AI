import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import UserMenu from './UserMenu';
import { IAuth } from '@/types/user';
import { Button } from './ui/button';
import Logo from './Logo';

const Header = async () => {
  const session = await auth() as IAuth;
  return (
    <div className='container max-w-5xl left-1/2 -translate-x-1/2 fixed z-10 top-4'>
      <header className='flex justify-between items-center min-h-16 bg-background/95 backdrop-blur
      supports-[backdrop-filter]:bg-background/60 dark:border rounded-xl px-4 py-3 shadow-lg'> 
        <Logo />
        
        {!session 
        
        ?(
          <Link href={'/login'}>
            <Button className='cursor-pointer'>Login</Button>
          </Link>
        )
        :(
          <UserMenu auth={session} />
        )
        
        }

        
        
      </header>

    </div>
    
  )
}

export default Header