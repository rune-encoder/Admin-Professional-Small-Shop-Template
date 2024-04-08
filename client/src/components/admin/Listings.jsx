// Import React Hooks
import { useEffect, useRef } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Actions
import { setProductMode } from "../../features/products/productSlice";

// Import Redux Selectors
import {
  selectGetProducts,
  selectGetProductsStatus,
} from "../../features/products/productSelectors";

import { selectSearchTerm, selectSortType } from "../../features/toolbarSlice";

// Import Redux Thunks
import {
  getProducts,
  deleteProduct,
} from "../../features/products/productThunks";

// Import Helpers
import { filterProducts, sortProducts } from "../../utils/helpers";

// Import React Icons
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

export default function Listings({ children }) {
  // !Delete: Used to check re-renders
  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current = renderCount.current + 1;
  //   console.log(`ItemList has rendered ${renderCount.current} times`);
  // });
  // ! ==========>

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
  // ! Revisit: ===================================^^^^

  const productRow = sortedProducts.map((product) => (
    <div
      key={product._id}
      className="item-row"
      onClick={() => {
        dispatch(setProductMode({ mode: "view", product }));
      }}
    >
      <div className="image-wrapper">
        <img
          src={product.image[0].url}
          alt={product.name}
          className="image-layout"
        />
      </div>

      <div>
        <div className="product-name">{product.name}</div>
        <div className="product-category">
          {product.category ? product.category.name : ""}
        </div>
      </div>

      <div className="product-date">01/01/10</div>
      <div className="product-price">{product.price}</div>
    </div>
  ));

  return (
    <div className="admin-page--wrapper">
      {children}

      <div className="product-list">{productRow}</div>
    </div>
  );
}
