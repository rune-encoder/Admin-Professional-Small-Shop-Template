require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const cloudConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true, // Use HTTPS when creating URLs
};

// Uploads an image file to Cloudinary. Returns the image's public ID.
const uploadImages = async (imagesDataUrls) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    upload_preset: "Shop-Template",
  };

  try {
    // Upload the images to Cloudinary
    const uploadPromises = imagesDataUrls.map((imageDataUrl) =>
      cloudinary.uploader.upload(imageDataUrl, options)
    );
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error(error);
  }
};

// Updates an image in Cloudinary. Returns the updated image's public ID (cloudinaryId) and URL.
const updateImage = async (imageData) => {
  const options = {
    public_id: imageData.cloudinaryId,
    overwrite: true, // Overwrite the image if it already exists
    invalidate: true, // Invalidate the old image so it is no longer accessible
  };

  try {
    // Update the image in Cloudinary
    const result = await cloudinary.uploader.upload(imageData.dataURL, options);

    // In our new image array of objects, after submitting the updated image to cloudinary,
    // we are replacing the old image URL with the new one and removing the dataURL property.
    return {
      cloudinaryId: imageData.cloudinaryId,
      url: result.url,
      _id: imageData._id,
    };
  } catch (error) {
    console.error(error);
  }
};

const deleteImages = async (imagesData) => {
  // Create an array of public IDs from the imagesData array
  const publicIds = imagesData.map((id) => id.cloudinaryId);

  const options = {
    invalidate: true, // Invalidate the image so it is no longer accessible
  };

  try {
    // Delete the images from Cloudinary
    const deletePromises = publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId, options)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImages, updateImage, deleteImages, cloudConfig };
