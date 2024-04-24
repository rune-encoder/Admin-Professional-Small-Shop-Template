// Summary: This component is responsible for rendering the selected product details in the product management page.
// It uses the ImagePreview and ImagesCarousel components to display the product images.

// Import React Hooks
import { useState } from "react";

// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Selectors
import { selectCurrentProduct } from "../../../../../../features/products/productSelectors";

// Import Redux Actions
import { setProductMode } from "../../../../../../features/products/productSlice";

// Import React Icons
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

// Import Components
import { ImagePreview, ImagesCarousel } from "./index";

export function ProductView() {
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

  //   !Revisit: Error Handling
  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="control-item">
      {/* Back Button */}
      <button className="control__btn-back">
        <IoArrowBack
          onClick={() =>
            dispatch(setProductMode({ mode: null, product: null }))
          }
        />
      </button>

      {/* Primary Product Image */}
      <ImagePreview displayImage={displayImage} />

      {/* Product Images Carousel */}
      <ImagesCarousel
        selectedImages={selectedProduct.image}
        setDisplayImage={setDisplayImage}
      />

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
