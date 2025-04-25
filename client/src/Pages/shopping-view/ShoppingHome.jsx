import React, { useEffect, useState } from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Image,
  Shirt,
  ShirtIcon,
  ShoppingBag,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetail, setProductDetails } from "@/store/shop-slice/product-slice";
import ShoppingProductTile from "@/components/shopping-component/ShoppingProductTile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import ShoppingDetailDialog from "@/components/shopping-component/ShoppingDetail";
import { getFeatureImages } from "@/store/common-slice/admin-feature-slice";

const CategoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const BrandWithIcon = [
  { id: "nike", label: "Nike" , icon: Shirt },
  { id: "adidas", label: "Adidas", icon:  WashingMachine},
  { id: "puma", label: "Puma", icon: ShoppingBag },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon:  Image},
  { id: "h&m", label: "H&M" , icon: Heater },
]
const ShoppingHome = () => {

const [currentSlide,setCurrentSlide] = useState(0)
  
  const {isAuthenticated} = useSelector((state) => state.auth);
// const { productList} = useSelector(state => state.shopProducts)
  const { productList , productDetail } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
 const [openDialog,setOpenDialog]=useState(false)
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch()
const navigate = useNavigate()
useEffect(() => {
  dispatch(getFeatureImages());
}, [dispatch]);
useEffect(()=>{
const timer = setInterval(()=>{
  setCurrentSlide(prevSlide => (prevSlide +1 ) % featureImageList.length )
},5000)
return ()=> clearInterval(timer)
},[featureImageList])

useEffect(()=>{
  dispatch(fetchAllFilteredProducts({filterParams: {} , sortParams : 'price-lowtohigh'}))

},[dispatch])

function handleNavigationToListingPage(getCurrentItem,section) {
  sessionStorage.removeItem('filters')
  const currentFillter = {
    [section] : [getCurrentItem.id]
  }
  sessionStorage.setItem('filters',JSON.stringify(currentFillter))
  navigate('/shop/listing')
}


  function handelGetProductDetails(getCurrentProductId){

dispatch(fetchProductDetail(getCurrentProductId))
  }

 function handleAddToCart(getCurrentProductId) {
   if (!isAuthenticated || !user?.id) {
     toast.error("Please login to add items to cart.");
     navigate("/auth/login");
     return;
   }
 
   dispatch(addToCart({ userId: user.id, productId: getCurrentProductId, quantity: 1 }))
     .then((data) => {
       if (data?.payload?.success) {
         dispatch(fetchCartItems(user.id));
         toast.success("Add to cart successful!");
       }
     });
 }
 
  useEffect(()=>{
  if(productDetail !== null ) setOpenDialog(true)
  },[productDetail])

  useEffect(() => {
      return () => {
        dispatch(setProductDetails());
      };
    }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
      {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}


        <Button
          variant="outline"
          size="icon"
          onClick={()=>setCurrentSlide(prevSlide => (prevSlide -1 + featureImageList.length) % featureImageList.length)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={()=>setCurrentSlide(prevSlide => (prevSlide +1) % featureImageList.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>


     
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {
              CategoriesWithIcon.map(Categoryitem=> <Card onClick={()=>handleNavigationToListingPage(Categoryitem, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
<Categoryitem.icon className="w-12 h-12 mb-4 text-primary"/>
<span className="">{Categoryitem.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
            {
              BrandWithIcon.map(Branditem=> <Card onClick={()=>handleNavigationToListingPage(Branditem, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
<Branditem.icon className="w-12 h-12 mb-4 text-primary"/>
<span className="">{Branditem.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className="py-12  ">
      <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {productList && productList.length > 0 &&
  productList.map(productItem => (
    <ShoppingProductTile handleAddToCart={handleAddToCart} handelGetProductDetails={handelGetProductDetails} key={productItem.id} product={productItem} />
))}
            </div>
          </div>
      </section>
      <ShoppingDetailDialog  open={openDialog} setOpen={setOpenDialog} productDetail={productDetail} />
    </div>
  );
};

export default ShoppingHome;


