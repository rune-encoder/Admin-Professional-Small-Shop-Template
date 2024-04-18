// ! Refactor and Breakdown

// Import React Hooks
import { useState } from "react";

// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Selectors
import { selectCurrentProduct } from "../../../../../features/products/productSelectors";

// Import Redux Actions
import { setProductMode } from "../../../../../features/products/productSlice";

// Import React Icons
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

// Import Embla Carousel
import useEmblaCarousel from "embla-carousel-react";

export function ViewProduct() {
  // ==============================
  // useSelector Hooks Section
  // ==============================
  const selectedProduct = useSelector(selectCurrentProduct);

  // ==============================
  // useState Hooks Section
  // ==============================
  const [displayImage, setDisplayImage] = useState(selectedProduct.image[0]);

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEmblaCarousel Hooks Section
  // ==============================
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  //   !Revisit: Error Handling
  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="control-item">
      {/* Back Button */}
      <button className="control__back-btn">
        <IoArrowBack
          onClick={() =>
            dispatch(setProductMode({ mode: null, product: null }))
          }
        />
      </button>

      {/* Primary Product Image */}
      <section className="preview-image-wrapper">
        <img
          className="preview-image"
          data-cloudinary-id={displayImage._id}
          src={displayImage.url}
          alt={`Selected image for ${selectedProduct.name}`}
        ></img>
      </section>

      {/* Product Images Carousel */}
      <section className="embla__control-images" ref={emblaRef}>
        <div className="embla__container">
          {selectedProduct.image.map((image, index) => (
            <div className="embla__slide--control-image" key={image.cloudinaryId}>
              <div className="control-image-wrapper">
                <img
                  className="control-image"
                  src={image.url}
                  alt={`Selected image ${index}`}
                  onClick={() => setDisplayImage(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Data */}
      <section className="control__item-details">
        <section className="control__item-row--flex-row">
          <label className="control__item-label">
            <MdOutlineShoppingCart /> Product:
          </label>

          <span className="control__item-value">{selectedProduct.name}</span>
        </section>

        <section className="control__item-row--flex-row">
          <label className="control__item-label">
            <MdOutlineCategory /> Category:
          </label>

          <span
            className={`${
              selectedProduct.category
                ? "control__item-value"
                : "control__item-value--danger"
            }`}
          >
            {selectedProduct.category
              ? selectedProduct.category.name
              : "None selected"}
          </span>
        </section>

        <section className="control__item-row--grid">
          <div className="control__item-cell">
            <div className="control__item-group">
              <label className="control__item-label">In Stock:</label>
              <span className="control__item-value">
                {selectedProduct.inStock ? (
                  <IoMdCheckmarkCircleOutline data-boolean="true" />
                ) : (
                  <IoMdCloseCircleOutline data-boolean="false" />
                )}
              </span>
            </div>

            <div className="control__item-group">
              <label className="control__item-label">Featured:</label>
              <span className="control__item-value">
                {selectedProduct.isFeatured ? (
                  <IoMdCheckmarkCircleOutline data-boolean="true" />
                ) : (
                  <IoMdCloseCircleOutline data-boolean="false" />
                )}
              </span>
            </div>
          </div>

          <div className="control__item-cell">
            <div className="control__item-group">
              <label className="control__item-label">Price:</label>
              <span className="control__item-value">
                ${selectedProduct.price}
              </span>
            </div>
            <div className="control__item-group">
              <label className="control__item-label">Quantity:</label>
              <span className="control__item-value">
                {selectedProduct.quantity}
              </span>
            </div>
          </div>
        </section>

        <section className="control__item-row--flex-col">
          <label className="control__item-label">Description:</label>
          <p className="control__item-value">
            {selectedProduct.shortDescription}
          </p>
        </section>

        <section className="control__item-row--flex-col">
          <label className="control__item-label">Details:</label>
          <p className="control__item-value">{selectedProduct.details}</p>
        </section>
      </section>
    </div>
  );
}
