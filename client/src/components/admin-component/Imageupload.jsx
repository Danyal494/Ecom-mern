import React, { useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import Loader from '../ui/Loader';

const ProductImageUpload = ({ imageFile, setImageFile, uploadImageUrl, setUploadImageUrl, setImageLoadingState, imageLoadingState,isEditMode }) => {
  const inputRef = useRef();

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadImageUrl(''); // Clear uploaded image URL
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }


  async function uploadImageToCloudinary() {
    if (!imageFile) return;

    setImageLoadingState(true);
    const data = new FormData();
    data.append('my_file', imageFile);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/products/upload-image`, data);
        // console.log("Response from API:", response.data); 

        if (response?.data?.imageUrl) {
            // console.log("Setting uploaded image URL:", response.data.imageUrl);
            setUploadImageUrl(response.data.imageUrl);
        } else {
            console.error("Invalid API response structure:", response.data);
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    } finally {
        setImageLoadingState(false);
    }
}


  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className='w-full max-w-md mx-auto'>
      <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-35" : ""} border-2 border-dashed rounded-lg p-4`}>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {
          !imageFile ? (
            <Label htmlFor="image-upload" className={` ${isEditMode ? "cursor-not-allowed" : ""}flex flex-col items-center justify-center h-32 cursor-pointer`}>
              <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
              <span>Drag & drop or click to upload image</span>
            </Label>
          ) : (
            imageLoadingState ? <Loader /> :
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FileIcon className='w-8 h-8 text-primary mr-2' />
                  <p className='text-sm font-medium'>{imageFile.name}</p>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleRemoveImage}
                >
                  <XIcon className='w-4 h-4' />
                  <span className='sr-only'>Remove File</span>
                </Button>
              </div>
          )
        }
      </div>
    </div>
  );
};

export default ProductImageUpload;
