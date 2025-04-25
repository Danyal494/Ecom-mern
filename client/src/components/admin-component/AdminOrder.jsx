import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import AdminOrderDetail from './AdminOrderDetail';

import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin-slice/admin-order-slice';

import { Badge } from '../ui/badge';

const AdminOrderView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orders, currentOrder } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(orderId) {
    dispatch(getOrderDetailsForAdmin(orderId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (currentOrder !== null) setOpenDetailsDialog(true);
  }, [currentOrder]);

  // Reset order details when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetOrderDetails());
    };
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0
              ? orders.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem.orderStatus === 'confirmed'
                            ? 'bg-green-500'
                            : orderItem.orderStatus === 'rejected'
                            ? 'bg-red-600'
                            : 'bg-black'
                        }`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>Rs {orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {/* Single dialog outside map */}
        <Dialog
          open={openDetailsDialog}
          onOpenChange={(open) => {
            setOpenDetailsDialog(open);
            if (!open) dispatch(resetOrderDetails());
          }}
        >
          <DialogContent>
            {currentOrder && <AdminOrderDetail order={currentOrder} />}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminOrderView;
