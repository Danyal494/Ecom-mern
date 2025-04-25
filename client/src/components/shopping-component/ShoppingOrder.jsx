import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import ShippingOrderDetail from './ShippingOrderDetail'
import { Dialog } from '../ui/dialog'
import { useDispatch, useSelector } from 'react-redux'

import { getAllOrdersByUserId } from '@/store/shop-slice/order-slice'
import { Badge } from '../ui/badge'
import Loader from '../ui/Loader'

const ShoppingOrder = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(null)  // Track the open dialog by order ID
  const { user } = useSelector(state => state.auth)
  const { orderList, isLoading } = useSelector(state => state.shopOrder)

  const dispatch = useDispatch()

  // Fetch orders when the component mounts
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id))
    }
  }, [dispatch, user?.id])
  
  if (isLoading) {
    return <Loader/>
  }
  console.log(orderList,"shopping")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Detail</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                  <Badge
                className={`py-1 px-3 ${
                  order?.orderStatus=== "confirmed"
                    ? "bg-green-500"
                    : order?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                 {order.orderStatus}
              </Badge>
                   </TableCell>
                  <TableCell>Rs.{order.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog open={openDetailsDialog === order._id} onOpenChange={() => setOpenDetailsDialog(openDetailsDialog === order._id ? null : order._id)}>
                      <Button onClick={() => setOpenDetailsDialog(openDetailsDialog === order._id ? null : order._id)}>
                        View Detail
                      </Button>
                      <ShippingOrderDetail order={order} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrder
