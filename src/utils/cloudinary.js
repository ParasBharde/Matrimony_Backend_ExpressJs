import  cloudinary  from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME || "keepcoading",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
console.log(process.env.CLOUDINARY_CLOUD_NAME || "keepcoading")
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)


const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response;

    } catch (error) {
        console.log(error.message);

    }
}

export default uploadCloudinary;