import ProductImageUpload from '@/components/admin-component/Imageupload';
import AdminProductTile from '@/components/admin-component/ProductTile';
import CommonForm from '@/components/common-component/CommonForm';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config/FormControls';
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from '@/store/admin-slice/admin-product-slice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: '',
  salePrice: '',
  totalStock: '',
};

const AdminProduct = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector(state => state.adminProducts);
const [currentEditId,setCurrentEditId] = useState(null)
  const dispatch = useDispatch();
// console.log(formData)
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);




function onSubmit(event) {
  event.preventDefault();

  // Ensure the image is retained if no new image is uploaded
  const finalImageUrl = uploadImageUrl || formData.image;

  if (!finalImageUrl) {
    toast.error("Please upload an image before submitting.");
    return;
  }

// 4:53:43

  if (currentEditId !== null) {

    dispatch(editProduct({
      id: currentEditId,
      formData: { ...formData, image: finalImageUrl }, // Retain image if not changed
    })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product updated successfully!");
        dispatch(fetchAllProduct());
        setOpenCreateProductDialog(false);
      }
    });
  } else {
    // Adding a new product
    dispatch(addNewProduct({
      ...formData,
      image: finalImageUrl, // Use the uploaded image
    })).then((data) => {
      if (data?.payload?.success) {
        setImageFile(null);
        setFormData(initialFormData);
        setUploadImageUrl('');
        dispatch(fetchAllProduct());
        toast.success('Product added successfully!');
        setOpenCreateProductDialog(false);
      }
    });
  }
}

useEffect(() => {
  // console.log("Updated uploadImageUrl in AdminProduct:", uploadImageUrl);
}, [uploadImageUrl]);


function isFormValid(params) {
  return Object.keys(formData).map((key) => formData[key] !== "").every((item)=>item)
}

function handleDelete(getCurrentProductID) {

  dispatch(deleteProduct(getCurrentProductID)).then((data)=>{
    if(data?.payload.success){
      dispatch(fetchAllProduct())
    }
  })
}

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductDialog(true)}>
      Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map(productItem => (
              <AdminProductTile setOpenCreateProductDialog={setOpenCreateProductDialog}
              setFormData={setFormData} setCurrentEditId={setCurrentEditId} key={productItem._id} product={productItem} handleDelete={handleDelete} />
            )) : null
        }
      </div>
      <Sheet 
  open={openCreateProductDialog} 
  onOpenChange={(isOpen) => { 
    if (!isOpen) { 
      setCurrentEditId(null);
      setFormData(initialFormData);
      setOpenCreateProductDialog(false);
    } 
  }}
>
        <SheetContent side='right' className="overflow-auto">
          <SheetHeader>
            <SheetTitle>   {
          currentEditId !== null ? "Edit Product" : "Add New Product"
         }</SheetTitle>
          </SheetHeader>
          <div className='px-4'>
            <ProductImageUpload 
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl} // ✅ Fixed prop name
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditId}

            />
          </div>
          <div className='py-6 px-4'>
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText=   {
                currentEditId !== null ? "Edit " : "Add "
               }
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProduct;
