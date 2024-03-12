import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

export default function ItemView({ selectedProduct }) {
  return (
    <div className="window__content--wrapper col-sm-12 col-md-5">
      {selectedProduct && (
        <div className="selected-item-view">
          <section className="item-view__top-section">
            <img
              className="item__image"
              src={selectedProduct.image.url}
            ></img>
          </section>
          <section className="item-view__bottom-section">
            <div className="item-view__header--wrapper row-no-gutters">
              <span className="item-view__name col-6">
                <MdOutlineShoppingCart /> {selectedProduct.name}
              </span>
              <span className="item-view__category col-6">
                <MdOutlineCategory /> {selectedProduct.category.name}
              </span>
            </div>

            <div className="details__info-group--wrapper row-no-gutters">
              <div className="col-6">
                <div className="details__item--wrapper">
                  <span className="details__item">
                    <span className="item-label">In Stock:</span>
                    <span className="item-value">
                      {selectedProduct.inStock ? (
                        <IoMdCheckmarkCircleOutline data-boolean="true" />
                      ) : (
                        <IoMdCloseCircleOutline data-boolean="false" />
                      )}
                    </span>
                  </span>
                  <span className="details__item">
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
                <div className="details__item--wrapper">
                  <span className="details__item">
                    <span className="item-label">Price:</span>
                    <span className="item-value">${selectedProduct.price}</span>
                  </span>
                  <span className="details__item">
                    <span className="item-label">Quantity:</span>
                    <span className="item-value">
                      {selectedProduct.quantity}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="item__description">
              <span className="">Description</span>
              <p>{selectedProduct.shortDescription}</p>
            </div>

            <div className="item__description">
              <span>Details</span>
              <p>{selectedProduct.details}</p>
              <p>{selectedProduct.details}</p>
              <p>{selectedProduct.details}</p>
              <p>{selectedProduct.details}</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
