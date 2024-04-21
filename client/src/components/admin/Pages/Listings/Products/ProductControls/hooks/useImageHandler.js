// Summary: These hooks are used to manage the images of the product in the product management page.
// It includes functions to handle image file changes and image updates.
// It also includes states to manage the selected images and the displayed image.

import { useState } from "react";

export const useImageHandler = (
  initialSelectedImages = [],
  initialDisplayImage = null
) => {
  // Initialize selectedImages with an empty array. This will hold the data URLs of the images uploaded.
  const [selectedImages, setSelectedImages] = useState(initialSelectedImages);

  // Initialize displayImage with null. This will hold the data URL of the image displayed.
  const [displayImage, setDisplayImage] = useState(initialDisplayImage);

  // Create Product: Image Handler
  const handleImageFileChange = async (e) => {
    // Create a new array from the files (or file) selected.
    const newFiles = Array.from(e.target.files);

    // Create a new promise for the images (or image) to be read.
    const newImages = newFiles.map((file) => {
      return new Promise((resolve, reject) => {
        // Create new instance of the file reader API
        const reader = new FileReader();

        // Event handler called when the read operation is completed.
        reader.onloadend = () => {
          resolve(reader.result);
        };

        // Event handler is called when an error occurs while reading the files (or file)
        // If there is an error, the promise is rejected.
        reader.onerror = reject;

        // Read the files (or file) and convert them to a data URL.
        reader.readAsDataURL(file);
      });
    });

    try {
      // Wait for all the images (or image) to settle.
      // If fulfilled, the array of data URLs is assigned to newDataUrls.
      const newDataUrls = await Promise.all(newImages);

      // Add the new data URLs to the state of selectedImages array.
      setSelectedImages((prevImages) => [...prevImages, ...newDataUrls]);

      // Set the displayed image to the first image file uploaded
      // Note: Noticable when multiple files are uploaded at once.
      setDisplayImage(newDataUrls[0]);
    } catch (error) {
      // If rejected, an error message is logged to the console.
      console.error("Error reading image files:", error);
    }
  };

  // Update Product: Image Handler
  const handleImageUpdate = async (index) => {
    try {
      // Create a new input element of type file.
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.name = "image";
      fileInput.accept = "image/*";

      // If a file is selected, trigger the onchange event.
      fileInput.onchange = async (e) => {
        // Obtain the new selected file.
        const file = e.target.files[0];

        if (file) {
          // Create a new promise for the image to be read.
          const newDataUrl = await new Promise((resolve, reject) => {
            // Create a new instance of the file reader API
            const reader = new FileReader();

            // Event handler called when the read operation is completed.
            reader.onloadend = () => resolve(reader.result);

            // Event handler is called when an error occurs while reading the file
            // If there is an error, the promise is rejected.
            reader.onerror = reject;

            // Read the file and convert it to a data URL.
            reader.readAsDataURL(file);
          });

          // Update the selected image with the new data URL.
          // Nest the new data URL in the selectedImages array at the index of the selected image.
          setSelectedImages((prevImages) =>
            // Map throught the previous images array
            prevImages.map((img, i) => {
              if (i === index) {
                // If the current image is the selected image, update the object to include the new data URL.
                const updatedImage = { ...img, dataURL: newDataUrl };

                // If the updated image is the currently displayed image, update displayImage as well.
                if (displayImage === img) {
                  setDisplayImage(updatedImage);
                }

                // Return the updated image object so it replaces the intended image object in the selectedImages array.
                return updatedImage;
              } else {
                return img;
              }
            })
          );
        }
      };

      // Trigger the file input to open the file selection dialog.
      fileInput.click();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return {
    selectedImages,
    displayImage,
    setDisplayImage,
    setSelectedImages,
    handleImageFileChange,
    handleImageUpdate,
  };
};
