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
    <div className="product-view">
      {/* ! Revisit: Naming */}
      <div className="view__close-btn">
        <button>
          <IoArrowBack
            onClick={() =>
              dispatch(setProductMode({ mode: null, product: null }))
            }
          />
        </button>
      </div>

      {/* Primary Product Image */}
      <section className="view__item-img-wrapper">
        <img
          className="view__item-img-layout"
          data-cloudinary-id={displayImage._id}
          src={displayImage.url}
          alt={`Selected image for ${selectedProduct.name}`}
        ></img>
      </section>

      {/* Product Images Carousel */}
      <section className="embla embla__view-images">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {selectedProduct.image.map((image, index) => (
              <div className="embla__slide--views" key={image.cloudinaryId}>
                <div className="slide-img-wrapper">
                  <img
                    className="slide-img"
                    src={image.url}
                    alt={`Selected image ${index}`}
                    onClick={() => setDisplayImage(image)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Data */}
      <section className="view__item-details">
        <section className="view__item-row--flex-row">
          <div className="view__item-label">
            <MdOutlineShoppingCart /> Product:
          </div>

          <span className="view__item-value">{selectedProduct.name}</span>
        </section>

        <section className="view__item-row--flex-row">
          <div className="view__item-label">
            <MdOutlineCategory /> Category:
          </div>

          <span
            className={`view__item-value ${
              selectedProduct.category ? "" : "view__item-value--danger"
            }`}
          >
            {selectedProduct.category
              ? selectedProduct.category.name
              : "None selected"}
          </span>
        </section>

        <section className="view__item-row--grid">
          <div className="view__item-cell">
            <div className="view__item-cell-group">
              <div className="view__item-label">In Stock:</div>
              <span className="view__item-value">
                {selectedProduct.inStock ? (
                  <IoMdCheckmarkCircleOutline data-boolean="true" />
                ) : (
                  <IoMdCloseCircleOutline data-boolean="false" />
                )}
              </span>
            </div>

            <div className="view__item-cell-group">
              <div className="view__item-label">Featured:</div>
              <span className="view__item-value">
                {selectedProduct.isFeatured ? (
                  <IoMdCheckmarkCircleOutline data-boolean="true" />
                ) : (
                  <IoMdCloseCircleOutline data-boolean="false" />
                )}
              </span>
            </div>
          </div>

          <div className="view__item-cell">
            <div className="view__item-cell-group">
              <div className="view__item-label">Price:</div>
              <span className="view__item-value">${selectedProduct.price}</span>
            </div>
            <div className="view__item-cell-group">
              <div className="view__item-label">Quantity:</div>
              <span className="view__item-value">
                {selectedProduct.quantity}
              </span>
            </div>
          </div>
        </section>

        <section className="view__item-row--flex-col">
          <div className="view__item-label">Description:</div>
          <p className="view__item-value">{selectedProduct.shortDescription}</p>
        </section>

        <section className="view__item-row--flex-col">
          <div className="view__item-label">Details:</div>
          <p className="view__item-value">{selectedProduct.details}</p>
        </section>
      </section>
    </div>
  );
}
