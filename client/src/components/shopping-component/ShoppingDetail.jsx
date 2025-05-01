import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import { toast } from "sonner"
import { setProductDetails } from "@/store/shop-slice/product-slice";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import StarRating from "../common-component/star-rating";
import { addNewReview, getReviews } from "@/store/shop-slice/review-slice";

const ShoppingDetailDialog = ({ open, setOpen, productDetail }) => {
const [reviewMsg,setReviewMsg] = useState('')
const [rating,setRating] = useState(0)
const dispatch=useDispatch()
const { user } = useSelector((state) => state.auth);
const { reviews } = useSelector((state) => state.shopReview);
const navigate = useNavigate()
const {isAuthenticated} = useSelector((state) => state.auth);
const {cartItems} = useSelector((state) => state.shopCart);
function handleAddToCart(getCurrentProductId,getTotalStock ) {
  if (!isAuthenticated || !user?.id) {
    toast.error("Please login to add items to cart.");
    navigate("/auth/login");
    return;
  }

  
   
    let getCartItems = cartItems.items || [];
  
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(
           `Only ${getQuantity} quantity can be added for this item`,
          
          );
  
          return;
        }
      }
    }

  dispatch(addToCart({ userId: user.id, productId: getCurrentProductId, quantity: 1 }))
    .then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast.success("Add to cart successful!");
      }
    });
}

const hasUserReviewed = isAuthenticated && reviews?.some(
  (rev) => rev.userId === user?.id
);

function handleDialogClose(){
  setOpen(false)
  setRating(0)
  setReviewMsg("")
  dispatch(setProductDetails())
}

function handleRatingCahange(getRating) {
setRating(getRating)
}

function handleAddReview() {
  if (!isAuthenticated) {
    toast.error("Please log in to leave a review.");
    return;
  }

  if (hasUserReviewed) {
    toast.error("You have already submitted a review for this product.");
    return;
  }

  dispatch(addNewReview({
    productId: productDetail?._id,
    userId: user?.id,
    userName: user?.userName,
    reviewMessage: reviewMsg,
    reviewValue: rating,
  })).then(data => {
    if (data?.error?.code === 'ERR_BAD_REQUEST' && data?.error?.message.includes("403")) {
      toast.error("You need to purchase the product before leaving a review.");
    } else if (data?.payload?.success) {
      toast.success("Review submitted successfully!");
    }
  });
}


useEffect(()=>{
  if(productDetail !== null) dispatch(getReviews(productDetail?._id))

},[productDetail])

const averageRating = reviews?.length
  ? reviews.reduce((acc, rev) => acc + rev.reviewValue, 0) / reviews.length
  : 0;


  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw]  sm:max-w-[80vw] lg:max-w-[70vw]">
    
     
    
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetail?.image || "/placeholder.jpg"}
            alt={productDetail?.title || "Product Image"}
            width={600}
            height={600}
            className="w-full h-[300px] object-cover aspect-square"
          />
        </div>

        <div className=" gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetail?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetail?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetail?.salePrice > 0 ? "line-through" : ""
              } `}
            >
              Rs.{productDetail?.price}
            </p>
            {productDetail?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                Rs.{productDetail.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 my-1.5">
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          averageRating > i ? "fill-yellow-400 stroke-0" : "stroke-muted-foreground"
        }`}
      />
    ))}
  </div>
  <span className="text-muted-foreground">
    ({averageRating.toFixed(1)})
  </span>
</div>


          <div className="mt-5 mb-5">
             <Button onClick={()=>handleAddToCart(productDetail?._id,productDetail?.totalStock)}  disabled={productDetail?.totalStock <= 0} className="w-full">   {productDetail?.totalStock <= 0 ? "Out of Stock" : "Add to Cart"}</Button>
          </div>
          <Separator className="" />
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <div className="max-h-[300px] overflow-y-auto">
            {" "}
            <div className="grid gap-6 ">
              {" "}
                {/* from here review */}
                {reviews && reviews.length > 0 ? (
  reviews.map((rew, index) => (
    <div key={index} className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarFallback>{rew?.userName?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold">{rew.userName}</h3>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: rew.reviewValue }, (_, i) => (
            <StarIcon key={i} className="w-5 h-5 fill-yellow-400 stroke-0" />
          ))}
        </div>
        <p className="text-muted-foreground">{rew.reviewMessage}</p>
      </div>
    </div>
  ))
) : (
  <h1 className="text-primary font-bold text-3xl">No reviews yet</h1>
)}
            
         
            </div>
          </div>
            <div className="mt-6 flex gap-2 flex-col">
              <Label>Write a Review</Label>
              <div className="flex"> <StarRating handleRatingCahange={handleRatingCahange} rating={rating}  /></div>
                <Input name="reviewMsg" value={reviewMsg} onChange={(event)=>setReviewMsg(event.target.value)} placeholder="Write a review..."/>
                <Button
  onClick={handleAddReview}
  disabled={
    !isAuthenticated ||
    reviewMsg.trim() === "" ||
    rating === 0 ||
    hasUserReviewed
}
>
  {hasUserReviewed ? "Review Submitted" : "Submit"}
</Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingDetailDialog;
