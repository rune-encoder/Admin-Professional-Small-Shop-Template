import {
    IoMdCheckmarkCircleOutline,
    IoMdCloseCircleOutline,
  } from "react-icons/io";
  import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

export default function ItemView({ selectedProduct }) {
  return (
    <>
      <div className="item-view__header--wrapper row-no-gutters">
        <span className="item-view__name col-6">
          <MdOutlineShoppingCart /> {selectedProduct.name}
        </span>
        <span className="item-view__category col-6">
          <MdOutlineCategory /> {selectedProduct.category.name}
        </span>
      </div>

      <div className="item-view__top-group--wrapper row-no-gutters">
        <div className="col-6">
          <div className="top-group__item--wrapper">
            <span className="top-group__item">
              <span className="item-label">In Stock:</span>
              <span className="item-value">
                {selectedProduct.inStock ? (
                  <IoMdCheckmarkCircleOutline data-boolean="true" />
                ) : (
                  <IoMdCloseCircleOutline data-boolean="false" />
                )}
              </span>
            </span>
            <span className="top-group__item">
              <span className="item-label">Featured:</span>
              <span className="item-value">
                {selectedProduct.isFeatured ? (
                  <IoMdCheckmarkCircleOutline data-boolean="true" />
                ) : (
                  <IoMdCloseCircleOutline data-boolean="false" />
                )}
              </span>
            </span>
          </div>
        </div>

        <div className="col-6">
          <div className="top-group__item--wrapper">
            <span className="top-group__item">
              <span className="item-label">Price:</span>
              <span className="item-value">${selectedProduct.price}</span>
            </span>
            <span className="top-group__item">
              <span className="item-label">Quantity:</span>
              <span className="item-value">{selectedProduct.quantity}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="item-view__description">
        <span className="">Description</span>
        <p>{selectedProduct.shortDescription}</p>
      </div>

      <div className="item-view__description">
        <span>Details</span>
        <p>{selectedProduct.details}</p>
      </div>
    </>
  );
}
