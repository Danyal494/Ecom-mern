import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import ShoppingCartContent from './ShoppingCartContent'
import { useNavigate } from 'react-router-dom'

const ShoppingCartWrapper = ({cartItems,setOpenCartSheet}) => {
  const navigate = useNavigate()
  const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum,currentItem)=> sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price ) * currentItem.quantity ,0) : 0
  return (
   <SheetContent className="sm:max-w-md ">
    <SheetHeader>
        <SheetTitle>
        Your Cart
        </SheetTitle>
          </SheetHeader>
          <div className='px-6'>

          <div className='mt-8 space-y-4'>
{
    cartItems && cartItems.length > 0 ? cartItems.map(item => <ShoppingCartContent cartItems={item} />) : null
}
          </div>
          <div className='mt-8  space-y-4'>
            <div className='flex justify-between'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>Rs.{totalCartAmount} </span>
            </div>
          </div>
          <Button onClick={()=> {navigate('/shop/checkout') ; setOpenCartSheet(false)}}  disabled={cartItems.length === 0} className="w-full mt-6">CheckOut</Button>
          </div>
   </SheetContent>
  )
}

export default ShoppingCartWrapper