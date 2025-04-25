import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner"
import { deleteCartItem, updateCartQuantity } from '@/store/shop-slice/cart-slice'

const ShoppingCartContent = ({cartItems}) => {

 const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch()
function handleQuantityUpdate(cartItems,typeOfAction){
dispatch(updateCartQuantity({userId: user?.id, productId: cartItems.productId ,quantity : typeOfAction === 'add' ? cartItems?.quantity + 1 : cartItems?.quantity - 1 })).then(data=>{
    if (data?.payload?.success){
        toast.success('update to cart successful!');

    }
})
}
  function handleCartItemDelete(){
    dispatch(deleteCartItem({ userId: user?.id, productId: cartItems.productId }))
 toast.success('delete to cart successful!');
  }
  
  return (
    <div className='flex items-center space-x-4'><img src={cartItems?.image} alt={cartItems?.title} className='w-20 h-20 rounded object-cover' />
    <div className='flex justify-between w-full'>

    <div className='flex flex-col '>
        <h3 className='font-extrabold'> {cartItems?.title}</h3>
        <div className='flex  items-center gap-1.5 mt-1'>
            <Button disabled={cartItems?.quantity === 1} onClick={()=>handleQuantityUpdate(cartItems,'minus')} variant="outline" className="h-8 w-8 " size="icon">
                <Minus className='w-4 h-4'/>
                <span className='sr-only'>Decrease</span>
            </Button>
            <span>{cartItems?.quantity}</span>
            <Button onClick={()=>handleQuantityUpdate(cartItems,'add')} variant="outline" className="h-8 w-8 " size="icon">
                <Plus className='w-4 h-4'/>
                <span className='sr-only'>Add</span>
            </Button>
        </div>
    </div>
        <div className='flex flex-col items-end'>
<p className='font-semibold'>Rs.{((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}</p>

<Trash className='cursor-pointer mt-1 ' size="20" onClick={()=> handleCartItemDelete(cartItems)} />  
        </div>
        
    </div>
    
    </div>
  )
}

export default ShoppingCartContent

