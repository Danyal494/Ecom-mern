import ShoppingDetailDialog from "@/components/shopping-component/ShoppingDetail";
import ProductFilter from "@/components/shopping-component/ShoppingFilter";
import ShoppingProductTile from "@/components/shopping-component/ShoppingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/FormControls";
import { addToCart,  fetchCartItems } from "@/store/shop-slice/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetail } from "@/store/shop-slice/product-slice";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner"

function createSearchParamsHelper(filterParams) {
  const quaryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const parmValue = value.join(",");
      quaryParams.push(`${key}=${encodeURIComponent(parmValue)}`);
    }
  }
  return quaryParams.join("&");
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isAuthenticated} = useSelector((state) => state.auth);
  // fetcchlistofProduct
  const { cartItems } = useSelector((state) => state.shopCart);
const [openDialog,setOpenDialog]=useState(false)
  const { productList , productDetail } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filter, sortParams: sort })
      );
  }, [dispatch, sort, filter]);



  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(value) {

    setSort(value);

  }

  function handleFilter(getSectionId, getCurrentOption) {

    let cpyFilters = { ...filter };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [searchParams]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQuaryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQuaryString));
    }
  }, [filter]);


  function handelGetProductDetails(getCurrentProductId){

dispatch(fetchProductDetail(getCurrentProductId))
  }



useEffect(()=>{
if(productDetail !== null ) setOpenDialog(true)
},[productDetail])



function handleAddToCart(getCurrentProductId,getTotalStock) {

  

  if (!isAuthenticated || !user?.id) {
    toast.error("Please login to add items to cart.");
    navigate("/auth/login");
    return;
  }

  console.log(cartItems,"cart");
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


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter handleFilter={handleFilter} filter={filter} />
      <div className="bg-background w-full ">
        <div className="p-4 border-b flex  items-center justify-between">
          <h2 className="text-lg font-extrabold">All Product</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4 " /> Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile product={productItem} 
                key={productItem.id} 
                handelGetProductDetails={handelGetProductDetails} handleAddToCart={handleAddToCart} />
              ))
            : null}
        </div>
      </div>
      <ShoppingDetailDialog  open={openDialog} setOpen={setOpenDialog} productDetail={productDetail} />
    </div>
  );
};

export default ShoppingListing;


