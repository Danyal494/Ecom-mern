import React, { useState } from 'react';
import img from '../../assets/account.jpg';
import ShoppingAddress from '@/components/shopping-component/ShoppingAddress';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartContent from '@/components/shopping-component/ShoppingCartContent';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { confirmCODOrder, createCODOrder, resetOrderDetails } from '@/store/shop-slice/order-slice';
import { clearCart } from '@/store/shop-slice/cart-slice';
import CODConfirmDialog from '@/components/shopping-component/CashonDilaviryDetail';

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showCODDialog, setShowCODDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // 'cod' or 'stripe'

  const DeliveryCharges = 150;
  const CODCharges = 50;

  const itemTotal = cartItems.items?.reduce((sum, item) => {
    const price = item?.salePrice > 0 ? item?.salePrice : item?.price;
    return sum + price * item.quantity;
  }, 0) || 0;

  const codSelected = paymentMethod === 'cod';

  const totalCartAmount = itemTotal + DeliveryCharges + (codSelected ? CODCharges : 0);

  const handleCODCheckout = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return;
    }

    const orderData = {
      userId: user.id,
      cartItems: cartItems.items,
      cartId: cartItems._id,
      addressInfo: selectedAddress,
      totalAmount: totalCartAmount,
      paymentMethod: 'cash on delivery',
      paymentStatus: 'unpaid',
      orderStatus: 'confirmed',
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createCODOrder(orderData)).then((res) => {
      if (res.payload?.success) {
        toast.success('Order placed successfully!');
        dispatch(confirmCODOrder(res.payload.orderId)).then((confirmRes) => {
          if (confirmRes.payload?.success) {
            dispatch(resetOrderDetails());
            dispatch(clearCart());
            sessionStorage.removeItem('cartItems');
            toast.success('Order confirmed and cart cleared!');
          } else {
            toast.error('Error confirming the order.');
          }
        });

        setSelectedAddress(null);
        navigate('/shop/order-success');
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  const handleStripeCheckout = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return;
    }

    // Your Stripe logic here
    toast.success('Stripe payment selected. Redirecting to payment...');
    navigate('/shop/stripe-checkout');
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} alt="Shopping Checkout" className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <ShoppingAddress selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />

        <div className="flex flex-col gap-4">
          {cartItems.items?.length > 0 ? (
            cartItems.items.map((cartItem) => (
              <ShoppingCartContent cartItems={cartItem} key={cartItem.productId} />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Shipping Charges</span>
              <span className="font-bold">Rs.{DeliveryCharges}</span>
            </div>
            {codSelected && (
              <div className="flex justify-between">
                <span className="font-bold">COD Charges</span>
                <span className="font-bold">Rs.{CODCharges}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>

          <div className="mt-4 w-full flex flex-col gap-4">
            {/* <Button
              variant="outline"
              disabled={!cartItems.items?.length}
              onClick={() => {
                setPaymentMethod('stripe');
                handleStripeCheckout();
              }}
            >
              Checkout with Card (Stripe)
            </Button> */}

            <Button
              disabled={!cartItems.items?.length}
              onClick={() => {
                setPaymentMethod('cod');
                setShowCODDialog(true);
              }}
            >
              Checkout with Cash on Delivery
            </Button>
          </div>
        </div>
      </div>

      {/* COD Confirmation Dialog */}
      <CODConfirmDialog
        open={showCODDialog}
        onCancel={() => setShowCODDialog(false)}
        onConfirm={() => {
          handleCODCheckout();
          setShowCODDialog(false);
        }}
        amounts={{
          itemTotal,
          deliveryCharges: DeliveryCharges,
          codCharges: CODCharges,
          total: itemTotal + DeliveryCharges + CODCharges,
        }}
      />
    </div>
  );
};

export default ShoppingCheckout;
