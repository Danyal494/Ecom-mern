import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResults, resetSearchResult } from '@/store/shop-slice/search-slice'
import ShoppingProductTile from './ShoppingProductTile'
import { addToCart, fetchCartItems } from '@/store/shop-slice/cart-slice'
import { toast } from "sonner"
import ShoppingDetailDialog from './ShoppingDetail'
import { fetchProductDetail } from '@/store/shop-slice/product-slice'
const SearchInput = () => {

    const [keyword,setKeyword] = useState('')
const [searchParams,setSearchParams] = useSearchParams()
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch()
   const { cartItems } = useSelector((state) => state.shopCart);
const {searchResult} = useSelector(state=>state.shopSearch)
const {isAuthenticated} = useSelector((state) => state.auth);
const [openDialog,setOpenDialog]=useState(false)
  const { productList , productDetail } = useSelector((state) => state.shopProducts);
const navigate = useNavigate()
useEffect(() => {
    const trimmed = keyword.trim();
    if (trimmed && trimmed.length > 3) {
      const delay = setTimeout(() => {
        setSearchParams({ keyword: trimmed });
        dispatch(getSearchResults(trimmed));
      }, 1000);
  
      return () => clearTimeout(delay); // Cleanup
    }
    else{
        dispatch(resetSearchResult())
    }
  }, [keyword]);

function handleAddToCart(getCurrentProductId) {
  if (!isAuthenticated || !user?.id) {
    toast.error("Please login to add items to cart.");
    navigate("/auth/login");
    return;
  }

  const getCartItems = cartItems.items || [];
  const currentProduct = productList.find(
    (product) => product._id === getCurrentProductId
  );

  const getTotalStock = currentProduct?.totalStock ?? 0;

  if (getCartItems.length) {
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === getCurrentProductId
    );
    if (indexOfCurrentItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentItem].quantity;
      if (getQuantity + 1 > getTotalStock) {
        toast.error(
          `Only ${getTotalStock} quantity can be added for this item`,
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
  
function handelGetProductDetails(getCurrentProductId){

dispatch(fetchProductDetail(getCurrentProductId))
  }

  useEffect(() => {
    if (productDetail !== null) {
      setOpenDialog(true);
    }
  }, [productDetail]);

console.log(searchResult,'result')
  return (
    <div className='container  py-8' >
    <div className='flex justify-center items-center'>
<div className='w-full flex items-center'>
    <Input 
    value={keyword} name="keyword"
    onChange= {(event)=> setKeyword(event.target.value)}
    className="py-6"
    placeholder = "Search Product ..."
    />
</div>
    </div>
 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'>
{
    searchResult && searchResult.length ? searchResult.map(item=>  <ShoppingProductTile product={item} 
        key={item.id} 
        handelGetProductDetails={handelGetProductDetails}
     handleAddToCart={handleAddToCart} />) : <h1 className='text-5xl w-screen font-extrabold'> No result found !</h1>
}
 </div>
 <ShoppingDetailDialog  open={openDialog} setOpen={setOpenDialog} productDetail={productDetail} />
    </div>
  )
}

export default SearchInput