const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Cloudinary Configuration
cloudinary.config({
    cloud_name: "domcwpo78",
    api_key: "193669155162126",
    api_secret: "n9obsxW7-0jZ9-BQgLq4tWW32B8",
});

// Multer Storage (Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to Upload to Cloudinary
async function imageUploadUtil(fileBuffer) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    console.error("❌ Cloudinary Upload Error:", error);
                    return reject(error);
                }
                console.log("✅ Cloudinary Upload Success:", result); // Debugging
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer); // Send file buffer to Cloudinary
    });
}

module.exports = { upload, imageUploadUtil };
