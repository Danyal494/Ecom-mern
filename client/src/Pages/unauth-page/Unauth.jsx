import React from 'react'
import unauthimg from '@/assets/401 Error Unauthorized.gif'
const Unauth = () => {
  return (
    <div className='flex items-center flex-col justify-center h-dvh'>
<img src={unauthimg} alt="" />
      <h1 className='font-semibold text-primary text-6xl'>You donot have access to view this page</h1>
    </div>
  )
}

export default Unauth