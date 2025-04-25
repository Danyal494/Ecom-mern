const { imageUploadUtil } = require('../../helpers/cloudinary');
const Product = require('../../models/Product');

async function handleImageUpload(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("📂 Received File:", req.file.originalname); // Debugging

        // Convert Multer file buffer to Cloudinary upload
        const fileBuffer = req.file.buffer;
        const result = await imageUploadUtil(fileBuffer);

        if (!result || !result.secure_url) {
            console.error("❌ Cloudinary Upload Failed: No valid response");
            return res.status(500).json({ message: "Image upload failed. No valid response from Cloudinary." });
        }

        res.status(200).json({ success: true, imageUrl: result.secure_url });

    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ message: "Image upload failed", error: error.message });
    }
}


//add anew products
const addProduct = async (req,res)=>{
    try {
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body

     const newlyCreatedProduct = new Product({
        image: image, // Ensure the correct field is set
    title, description, category, brand, price, salePrice, totalStock
});
await newlyCreatedProduct.save()
res.status(201).json({
    success:true,
    data:newlyCreatedProduct,
})
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            success:false,
            message:"Error occured",
        })
    }
}



//fetch all products
const fetchAllProduct = async (req,res)=>{
    try {
        const listofProduct = await Product.find({})
        res.status(201).json({
            success:true,
            data:listofProduct,
        })
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            success:false,
            message:"Error occured",
        })
    }
}

//edit a product
const editProduct = async (req,res)=>{
    try {
        const {id} = req.params
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body
        let findProduct = await Product.findById(id)
        if(!findProduct) return res.status(404).json({
            success:false,
            message:"Product not found"
        })

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price === " " ? 0 : price || findProduct.price
        findProduct.salePrice = salePrice === " " ? 0 : salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save()

        res.status(200).json({
            success:true,
            message:"edit successfull"
        })

    } catch (error) {
        console.log(error) 
        res.status(500).json({
            success:false,
            message:"Error occured",
        })
    }
}

// delete a product
const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)

        if(!product) return res.status(404).json({
            success:false,
            message:"Product not found"
        })

        res.status(200).json({
            success:true,
            message:"delete successfull"
        })
        
    } catch (error) {
        console.log(error) 
        res.status(500).json({
            success:false,
            message:"Error occured",
        })
    }
}

module.exports = { handleImageUpload,addProduct,editProduct,fetchAllProduct,deleteProduct };
