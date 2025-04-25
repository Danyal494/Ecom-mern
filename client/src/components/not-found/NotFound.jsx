import React from 'react'
import notFoundimg from '@/assets/not found.svg'
const NotFound = () => {
  return (
   <div className='flex items-center flex-col justify-center h-dvh'>
  <img src={notFoundimg} alt="" className='w-[400px]' />
        <h1 className='font-semibold text-primary text-6xl'>Page not found</h1>
      </div>
  )
}

export default NotFound