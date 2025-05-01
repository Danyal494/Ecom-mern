import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  deleteCartItem,
  updateCartQuantity,
} from "@/store/shop-slice/cart-slice";

const ShoppingCartContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const { productList  } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
//   function handleQuantityUpdate(cartItems, typeOfAction) {

//     if(typeOfAction == 'add'){
//          let getCartItems = cartItems.items || [];
          
//             if (getCartItems.length) {
//               const indexOfCurrentCartItem = getCartItems.findIndex(
//                 (item) => item.productId === cartItems.productId
//               );
//               const getCurrentProductIndex = productList.findIndex(product => product._id === cartItems?.productId )
//               const getTotalStock = productList[getCurrentProductIndex].totalStock
//               if (indexOfCurrentCartItem > -1) {
//                 const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
//                 if (getQuantity + 1 > getTotalStock) {
//                   toast.error(
//                    `Only ${getQuantity} quantity can be added for this item`,
                  
//                   );
          
//                   return;
//                 }
//               }
//             }
//     }

//     dispatch(
//       updateCartQuantity({
//         userId: user?.id,
//         productId: cartItems.productId,
//         quantity:
//           typeOfAction === "add"
//             ? cartItems?.quantity + 1
//             : cartItems?.quantity - 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast.success("update to cart successful!");
//       }
//     });
//   }

function handleQuantityUpdate(cartItem, typeOfAction) {
    if (typeOfAction === "add") {
      const product = productList.find(
        (product) => product._id === cartItem?.productId
      );
  
      if (!product) {
        toast.error("Product not found.");
        return;
      }
  
      const currentQuantity = cartItem.quantity;
      const totalStock = product.totalStock;
  
      if (currentQuantity + 1 > totalStock) {
        toast.error(`Only ${totalStock} quantity available for this item.`);
        return;
      }
    }
  
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: cartItem.productId,
        quantity:
          typeOfAction === "add"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart updated successfully!");
      }
    });
  }
  


  function handleCartItemDelete() {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: cartItems.productId })
    );
    toast.success("delete to cart successful!");
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col ">
          <h3 className="font-extrabold"> {cartItems?.title}</h3>
          <div className="flex  items-center gap-1.5 mt-1">
            <Button
              disabled={cartItems?.quantity === 1}
              onClick={() => handleQuantityUpdate(cartItems, "minus")}
              variant="outline"
              className="h-8 w-8 "
              size="icon"
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span>{cartItems?.quantity}</span>
            <Button
              onClick={() => handleQuantityUpdate(cartItems, "add")}
              variant="outline"
              className="h-8 w-8 "
              size="icon"
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Add</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            Rs.
            {(
              (cartItems?.salePrice > 0
                ? cartItems?.salePrice
                : cartItems?.price) * cartItems?.quantity
            ).toFixed(2)}
          </p>

          <Trash
            className="cursor-pointer mt-1 "
            size="20"
            onClick={() => handleCartItemDelete(cartItems)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartContent;
