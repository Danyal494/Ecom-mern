// components/shopping-component/CODConfirmDialog.jsx
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

const CODConfirmDialog = ({ open, onCancel, onConfirm, amounts }) => {
  const { itemTotal, deliveryCharges, codCharges, total } = amounts;

  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Cash on Delivery</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to place a COD order.
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items Total:</span>
                <span>Rs.{itemTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charges:</span>
                <span>Rs.{deliveryCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>COD Charges:</span>
                <span>Rs.{codCharges}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Grand Total:</span>
                <span>Rs.{total}</span>
              </div>
            </div>
            <br />
            Do you want to proceed with Cash on Delivery?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Yes, Place Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CODConfirmDialog;
