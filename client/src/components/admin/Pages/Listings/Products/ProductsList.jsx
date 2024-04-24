// Import React Hooks
import { useEffect } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetProducts,
  selectGetProductsStatus,
} from "../../../../../features/products/productSelectors";

import {
  selectSearchTerm,
  selectSortType,
} from "../../../../../features/toolbarSlice";

// Import Redux Thunks
import { getProducts } from "../../../../../features/products/productThunks";

// Import Helpers
import { filterProducts } from "../../../../../utils/helpers/products/filter";
import { sortProducts } from "../../../../../utils/helpers/products/sort";

// Import Components
import { ProductRow } from "./ProductRow";

export function ProductsList() {
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

  // !Revisit: Handling Loading State
  if (getProductsStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="listings">
      {sortedProducts.map((product) => (
        <ProductRow key={product._id} product={product} />
      ))}
    </div>
  );
}
