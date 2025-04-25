import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const AdminProductTile = ({ product,setFormData,setOpenCreateProductDialog ,setCurrentEditId , handleDelete}) => {
  return (
    <Card className="w-full max-w-sm mx-auto py-0 pb-2">
      <div>
        <div className="relative">
        <img
  src={product?.image || "/placeholder.jpg"} alt={product?.title || "Product Image"} 
  className="w-full h-[300px] object-cover rounded-t-lg"
/>
{product?.totalStock > 0 && product?.totalStock < 5 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
    Only {product.totalStock} left in stock!
  </Badge>
)}
        </div>
        <CardContent className="px-2" >
          <h2 className="text-xl font-bold mb-2 ">{product?.title}</h2>
          <div className='flex justify-between items-center mb-2'>
    <span className={` ${product?.salePrice > 0 ? 'line-through ' : ''} text-lg font-bold text-primary`}>
        Rs {product?.price}
    </span>
    {
        product?.salePrice > 0 ? <span className='text-lg font-bold  text-red-500'>Rs {product?.salePrice}</span> : null
    }
</div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-3 " >
<Button onClick={()=>{
  setOpenCreateProductDialog(true)
  setCurrentEditId(product?._id)
setFormData(product)
}}>Edit</Button>
<Button onClick={()=>handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
