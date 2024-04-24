// This component is used to display the selected image for a product.
// It takes two props: displayImage and selectedProduct.
// displayImage is the image to display.
// selectedProduct is the product that the image is associated with (if any).
export function ImagePreview({ displayImage, selectedProduct }) {
  let src;
  let cloudinaryId;
  let altText = selectedProduct
    ? `Image selected for product: ${selectedProduct?.name}`
    : "Display image for product under creation";

  // Check if displayImage is defined
  if (displayImage) {
    // Check if displayImage is a "string".
    // If displayImage is a string, it assigns the displayImage which contains a dataURL string to src.
    src =
      typeof displayImage === "string"
        ? displayImage
        : // If displayImage is not a string, assume that displayImage is an object and attempt to assign displayImage.dataURL to src. It should only have a dataURL in the specific image object when attempting to update a product image.
          // If displayImage.dataURL is undefined or null, it assigns displayImage.url to src. This happens when viewing a product image or an image is not selected for being updated.
          displayImage.dataURL ?? displayImage.url;

    // Attempt to assign displayImage._id to cloudinaryId.
    // If displayImage._id is undefined or null, assign displayImage.cloudinaryId to cloudinaryId.
    cloudinaryId = displayImage?._id ?? displayImage?.cloudinaryId;
  }

  return (
    // Primary Product Image
    <section className="preview-image-wrapper">
      {src && (
        <img
          className="preview-image"
          data-cloudinary-id={cloudinaryId}
          src={src}
          alt={altText}
        />
      )}
    </section>
  );
}
