import React from 'react'

const Footer = () => {
  return (
    <div className='container py-2'>
        <p className='text-center text-sm text-muted-foreground'>
          Copyright &copy; {new Date().getFullYear()} Humanizer

        </p>
    </div>
  )
}

export default Footer