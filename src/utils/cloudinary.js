import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // upload the file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // so it can detect the resource type by itself
        })

        // file has been uploaded successfully
        console.log("File has been uploaded on cloudinary! ", response.url);

        fs.unlinkSync(localFilePath)

        return response;

    } catch(error) {
         // Remove the locally saved temporary file as the upload operator got failed
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }