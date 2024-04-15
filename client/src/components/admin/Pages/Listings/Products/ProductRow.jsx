import { useCallback } from "react";

// Import Redux Hooks
import { useDispatch } from "react-redux";

// Import Redux Actions
import { setProductMode } from "../../../../../features/products/productSlice";

// Import Redux Thunks
import {
  getProducts,
  deleteProduct,
} from "../../../../../features/products/productThunks";

// Import Components
import { ActionButtons } from "../../../Tools";

// Import React Icons
import { IoPricetagOutline } from "react-icons/io5";
import {
  MdOutlineCategory,
  MdOutlineShoppingCart,
  MdOutlineCalendarToday,
} from "react-icons/md";

export function ProductRow({ product }) {
  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleDeleteProduct = useCallback(
    async (product) => {
      // Get the product id and images
      let productId = product._id;
      let productImages = product.image.map(({ __typename, ...rest }) => rest);

      // Wait for the product to be deleted
      await dispatch(deleteProduct({ id: productId, images: productImages }));

      // Refresh the products list global state by fetching the products again. (Server or Cache)
      dispatch(getProducts());
    },
    [dispatch]
  );

  return (
    <div key={product._id} className="item-row--product">
      <div className="item-cell">
        <div className="item__img-wrapper">
          <img
            src={product.image[0].url}
            alt={product.name}
            className="item__img-layout"
          />
        </div>
      </div>

      <div className="item-cell">
        <div className="item-wrapper">
          <div className="item-group">
            <div className="item-label">
              <MdOutlineShoppingCart />
              Product:
            </div>
            <div className="item-name--product">{product.name}</div>
          </div>

          <div className="item__product-category">
            {product.category ? (
              <>
                <MdOutlineCategory /> {product.category.name}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="item-cell">
        <div className="item-label">
          <MdOutlineCalendarToday />
          Date:
        </div>
        <div className="item__product-date">01/01/10</div>
      </div>

      <div className="item-cell">
        <div className="item-wrapper">
          <div className="item-group">
            <div className="item-label">
              <IoPricetagOutline />
              Price:
            </div>
            <div className="item__product-price">${product.price}</div>
          </div>
          <div className="item__product-quantity">
            Stock: {product.quantity}
          </div>
        </div>
      </div>

      <ActionButtons
        type="view"
        onClick={() => dispatch(setProductMode({ mode: "view", product }))}
      />

      <ActionButtons
        type="update"
        onClick={() => dispatch(setProductMode({ mode: "update", product }))}
      />

      <ActionButtons
        type="delete"
        onClick={() => handleDeleteProduct(product)}
      />
    </div>
  );
}
