// Import React Hooks
import { useEffect } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Actions
import { setProductMode } from "../../../../../features/products/productSlice";

// Import Redux Selectors
import {
  selectGetProducts,
  selectGetProductsStatus,
} from "../../../../../features/products/productSelectors";

import { selectSearchTerm, selectSortType } from "../../../../../features/toolbarSlice";

// Import Redux Thunks
import {
  getProducts,
  deleteProduct,
} from "../../../../../features/products/productThunks";

// Import Helpers
import { filterProducts } from "../../../../../utils/helpers/products/filter";
import { sortProducts } from "../../../../../utils/helpers/products/sort";

// Import React Icons
import { IoPricetagOutline } from "react-icons/io5";
import {
  MdOutlineCategory,
  MdOutlineShoppingCart,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

export function Products() {
  // ==============================
  // useSelector Hooks Section
  // ==============================
  const products = useSelector(selectGetProducts);
  const getProductsStatus = useSelector(selectGetProductsStatus);
  const searchTerm = useSelector(selectSearchTerm);
  const sortType = useSelector(selectSortType);

  const filteredProducts = filterProducts(products, searchTerm);
  const sortedProducts = sortProducts(filteredProducts, sortType);

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEffect Hooks Section
  // ==============================
  useEffect(() => {
    // Fetch products from the server for the list when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleDeleteProduct = async (product) => {
    // Get the product id and images
    let productId = product._id;
    let productImages = product.image.map(({ __typename, ...rest }) => rest);

    dispatch(setProductMode({ mode: null, product: null }));

    // Wait for the product to be deleted
    await dispatch(deleteProduct({ id: productId, images: productImages }));

    // Refresh the products list global state by fetching the products again. (Server or Cache)
    dispatch(getProducts());
  };

  // !Revisit: Handling Loading State
  if (getProductsStatus === "loading") {
    return <div>Loading...</div>;
  }

  const productRow = sortedProducts.map((product) => (
    <div
      key={product._id}
      className="item-row--product"
      onClick={() => {
        dispatch(setProductMode({ mode: "view", product }));
      }}
    >
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

      <div className="item-cell--actions">
        <button
          className="item-cell__btn--update"
          data-action="Update"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(setProductMode({ mode: "update", product }));
          }}
        >
          <FiEdit />
          Update
        </button>
      </div>

      <div className="item-cell--actions">
        <button
          className="item-cell__btn--delete"
          data-action="Delete"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteProduct(product);
          }}
        >
          <BsTrash />
          Delete
        </button>
      </div>
    </div>
  ));

  return <div className="listings">{productRow}</div>;
}
