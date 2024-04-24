// Import Embla Carousel
import useEmblaCarousel from "embla-carousel-react";

// Import React Icons
import { BsSave } from "react-icons/bs";

// This is a component for displaying a carousel of product images.
// It takes three props: selectedImages, setDisplayImage, and handleImageUpdate.
// selectedImages is an array of images to display.
// setDisplayImage is a function to call when an image is clicked.
// handleImageUpdate is an optional function to call when the Update button is clicked.
export function ImagesCarousel({
  selectedImages,
  setDisplayImage,
  handleImageUpdate,
}) {
  // ==============================
  // useEmblaCarousel Hooks Section
  // ==============================
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  return (
    // Product Images Carousel
    <section className="embla__control-images" ref={emblaRef}>
      <div className="embla__container">
        {selectedImages.map((image, index) => {
          let src;
          let key;

          // Check if the image is a string or an object
          if (typeof image === "string") {
            // If the image is a string, assign the image to src and the index to key.
            src = image;
            key = index;
          } else {
            // If the image is not a string, assume that the image is an object.
            // Attempt to assign the image.dataURL to src. (Only if it is being updated)
            // If image.dataURL is undefined or null, (Not an updated photo) assign image.url to src.
            src = image?.dataURL ?? image.url;
            key = image?._id ?? image.cloudinaryId;
          }

          return (
            <div className="embla__slide--control-image" key={key}>
              <div className="control-image-wrapper">
                <img
                  className="control-image"
                  src={src}
                  alt={`Selected image ${index}`}
                  onClick={() => setDisplayImage(image)}
                />

                {/* Render Update Button for update mode*/}
                {handleImageUpdate && (
                  <button
                    className="control-image__btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleImageUpdate(index);
                    }}
                  >
                    <BsSave />
                  </button>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
