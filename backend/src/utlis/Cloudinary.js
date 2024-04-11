// Importing the v2 module from the 'cloudinary' library
import { v2 as cloudinary } from 'cloudinary';

// Importing the 'fs' (file system) module from Node.js
import fs from "fs";
import dotenv from "dotenv"
dotenv.config({
    path : './.env'
})
// Configuring the Cloudinary API credentials using environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(process.env.CLOUDINARY_CLOUD_NAME)
// Defining an asynchronous function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    console.log("k",localFilePath)
    try {
        // Checking if the localFilePath is provided; if not, return null
        if (!localFilePath){
            console.log("lauda")
            return null;
        } 

        // Uploading the file to Cloudinary using the uploader.upload method
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically determine the resource type
        });

        // Logging a success message if the file is uploaded successfully
        console.log("File Uploaded", response);

        if (fs.existsSync(localFilePath)) {
            // Attempt to delete the local file
            fs.unlinkSync(localFilePath);
            console.log(`Deleted local file: ${localFilePath}`);
        } else {
            console.log(`Local file does not exist: ${localFilePath}`);
        }

        // Returning the Cloudinary response
        return response;
    }
    catch (error) {
        // If an error occurs during the upload, remove the locally saved temp file
        if (fs.existsSync(localFilePath)) {
            // Attempt to delete the local file
            fs.unlinkSync(localFilePath);
            console.log(`Deleted local file: ${localFilePath}`);
        } else {
            console.log(`Local file does not exist: ${localFilePath}`);
        }

        // Returning null to indicate the upload failure
        return null;
    }
}

// Exporting the uplodOnCloudinary function to make it available for use in other modules
export { uploadOnCloudinary };
