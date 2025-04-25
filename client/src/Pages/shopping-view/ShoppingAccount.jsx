import React from 'react'
import accbg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShoppingOrder from '@/components/shopping-component/ShoppingOrder'
import ShoppingAddress from '@/components/shopping-component/ShoppingAddress'
const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={accbg} width={1600} height={300} alt="account bg " className='h-full w-full object-cover object-center'/>
      </div>

      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue="orders" >
<TabsList>
  <TabsTrigger value="orders" >Orders</TabsTrigger>
  <TabsTrigger value="address" >Address</TabsTrigger>
</TabsList>
<TabsContent value='orders'><ShoppingOrder/></TabsContent>
<TabsContent value='address'><ShoppingAddress/></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount