import SearchInput from '@/components/shopping-component/SearchInput'
import React from 'react'

const ShoppingSearch = () => {
  return (

      <div className=' md:px-6 px-4 py-6'>
<div>

      <h1 className='text-4xl font-bold text-primary' >Search products</h1>
      <SearchInput/>
</div>
      </div>
  
  )
}

export default ShoppingSearch