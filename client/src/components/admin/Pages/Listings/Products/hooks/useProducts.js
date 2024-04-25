// Summary: This hook will encapsulate the logic for fetching the products,
// filtering the products based on the search term,
// and sorting the products based on the sort type.

// Import React Hooks
import { useEffect } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetProducts,
  selectGetProductsStatus,
} from "../../../../../../features/products/productSelectors";

import {
  selectSearchTerm,
  selectSortType,
} from "../../../../../../features/toolbarSlice";

// Import Redux Thunks
import { getProducts } from "../../../../../../features/products/productThunks";

// Import Helpers
import { filterProducts } from "../../../../../../utils/helpers/products/filter";
import { sortProducts } from "../../../../../../utils/helpers/products/sort";

export function useProducts() {
  // Select products and get products fetch status from the Redux store
  const products = useSelector(selectGetProducts);
  const getProductsStatus = useSelector(selectGetProductsStatus);

  // Select the search term and sort type from the Redux store
  const searchTerm = useSelector(selectSearchTerm);
  const sortType = useSelector(selectSortType);

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Fetch products from the server for the list when the component mounts
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter products based on the search term
  const filteredProducts = filterProducts(products, searchTerm);

  // Sort the filtered products based on the sort type
  const sortedProducts = sortProducts(filteredProducts, sortType);

  // Return the sorted products and status of the products fetch
  return { sortedProducts, getProductsStatus };
}
