require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const cloudConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true, // Use HTTPS when creating URLs
};

// Uploads an image file to Cloudinary. Returns the image's public ID.
const uploadImages = async (imagePaths) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    upload_preset: "Shop-Template",
  };

  try {
    // Upload the images
    const uploadPromises = imagePaths.map(imagePath => cloudinary.uploader.upload(imagePath, options));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImages, cloudConfig };
