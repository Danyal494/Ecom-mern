import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'



const ShippingOrderDetail = ({order}) => {
    const { user } = useSelector(state => state.auth)
//   console.log(user)
console.log(order)
  return (
 <DialogContent className="sm:max-w-[600px]" >
<div className='grid gap-6' >
    <div className='grid gap-2' >
        <div className='flex items-center  mt-6 justify-between' >
    <p className='font-medium'>Order ID</p>
    <Label>{order?._id}</Label>
        </div>
        <div className='flex items-center  mt-1 justify-between' >
    <p className='font-medium'>Order Date</p>
    <Label>{new Date(order.orderDate).toLocaleDateString()}</Label>
        </div>

        <div className='flex items-center  mt-1 justify-between' >
    <p className='font-medium'>Order Price</p>
    <Label>Rs.{order.totalAmount}</Label>
        </div>

        <div className='flex items-center  mt-1 justify-between' >
    <p className='font-medium'>Order Status</p>
    <Label>
        
    <Badge
                className={`py-1 px-3 ${
                    order?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : order?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                 {order.orderStatus}
              </Badge>
              </Label>
        </div>
      
    </div>
    <Separator/>
    <div className='grid gap-4'>
        <div className='grid gap-2'>
            <div className='font-medium'>Order Detail</div>
            <ul className='grid gap-3' >
            {order.cartItems.map((cartItem) => (
                <li key={cartItem.productId} className='flex items-center justify-between'>
                  <span>Title: {cartItem.title}</span>
                  <span>Quantity: {cartItem.quantity}</span>
                  <span>Price: Rs.{cartItem.salePrice <= 0 ? cartItem.price : cartItem.salePrice}</span>
                </li>
              ))}
            </ul>
        </div>
    </div>

    <div className='grid gap-4'>
        <div className='grid gap-2'>
            <div className='font-medium'>Shipping Info</div>
            <ul className='grid gap-3' >
                <li className='grid gap-0.5 text-muted-foreground'>
               
               
                    <div className='flex justify-between'>
                        
                    <span>Name</span>
                    <span>{user.userName}</span>
                    </div>
                    <div className='flex justify-between'>
                        
                        <span>Address</span>
                    <span>{order.addressInfo?.address}</span>
                        </div>
                    <div className='flex justify-between'>
                        
                    <span>City</span>
                <span>{order.addressInfo?.city}</span>
                    </div>
                    <div className='flex justify-between'>
                        
                    <span>PinCode</span>
                <span>{order.addressInfo?.pincode}</span>
                    </div>
                    <div className='flex justify-between'>
                    <span>Phone</span>
                <span>{order.addressInfo?.phone}</span>
                        
                    </div>
                    <div className='flex justify-between'>

                    <span>Notes</span>
                <span>{order.addressInfo?.notes}</span>
                        
                    </div>
                </li>
            </ul>
        </div>
    </div>

   
</div>
 </DialogContent>
  )
}

export default ShippingOrderDetail