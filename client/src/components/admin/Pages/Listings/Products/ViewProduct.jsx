// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectCurrentProduct } from "../../../../../features/products/productSelectors";

// Import React Icons
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

export function ViewProduct() {
  const selectedProduct = useSelector(selectCurrentProduct);

  return (
    <>
      <div className="product-view">
        <section className="view__item__img-wrapper">
          <img
            className="view__item__img-layout"
            data-cloudinary-id={selectedProduct.image[0].cloudinaryId}
            src={selectedProduct.image[0].url}
          ></img>
        </section>

        <section className="view__item-details">
          <section className="view__item-section--flex-row">
            <div className="view__item-label">
              <MdOutlineShoppingCart /> Product:
            </div>

            <span className="item-value">{selectedProduct.name}</span>
          </section>

          <section className="view__item-section--flex-row">
            <div className="view__item-label">
              <MdOutlineCategory /> Category:
            </div>

            <span
              className={`item-value ${
                selectedProduct.category ? "" : "item-value--danger"
              }`}
            >
              {selectedProduct.category
                ? selectedProduct.category.name
                : "None selected"}
            </span>
          </section>

          <section className="view__item-section--grid">
            <div className="view__item-cell">
              <div className="view__item-cell-group">
                <div className="view__item-label">In Stock:</div>
                <span className="item-value">
                  {selectedProduct.inStock ? (
                    <IoMdCheckmarkCircleOutline data-boolean="true" />
                  ) : (
                    <IoMdCloseCircleOutline data-boolean="false" />
                  )}
                </span>
              </div>

              <div className="view__item-cell-group">
                <div className="view__item-label">Featured:</div>
                <span className="item-value">
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
                <span className="item-value">${selectedProduct.price}</span>
              </div>
              <div className="view__item-cell-group">
                <div className="view__item-label">Quantity:</div>
                <span className="item-value">{selectedProduct.quantity}</span>
              </div>
            </div>
          </section>

          <section className="view__item-section--flex-col">
            <div className="view__item-label">Description:</div>
            <p className="item-value">{selectedProduct.shortDescription}</p>
          </section>

          <section className="view__item-section--flex-col">
            <div className="view__item-label">Details:</div>
            <p className="item-value">{selectedProduct.details}</p>
          </section>
        </section>
      </div>
    </>
  );
}
