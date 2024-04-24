// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Selectors
import { selectProductMode } from "../../../../../features/products/productSelectors";
import { selectCategoryMode } from "../../../../../features/categories/categorySelectors";

// Import Redux Actions
import { setCategoryMode } from "../../../../../features/categories/categorySlice";
import { setProductMode } from "../../../../../features/products/productSlice";
import {
  setListType,
  setSearchTerm,
  setSortType,
} from "../../../../../features/toolbarSlice";

// Import Redux Selectors
import {
  selectSortType,
  selectListType,
  selectSearchTerm,
} from "../../../../../features/toolbarSlice";

// Import Constants
import { getSortOptions } from "../../../../../constants/sortOptions";

/**
 * Custom hook to manage toolbar state.
 * Provides an interface to get and set product mode, category mode, sort type, list type, and search term.
 *
 * @returns {Object} An object containing the current state and setters for product mode, category mode, sort type, list type, and search term.
 */
export function useToolbarState() {
  // ==============================
  // useSelector Hooks Section
  // ==============================
  const productMode = useSelector(selectProductMode); // Product mode: "view", "update", "create", etc.
  const categoryMode = useSelector(selectCategoryMode); // Category mode: "view", "update", "create", etc.
  const sortType = useSelector(selectSortType); // Sort type: "none", "asc", "desc", etc.
  const listType = useSelector(selectListType); // List type: "products", "categories", etc.
  const searchTerm = useSelector(selectSearchTerm); // Search term

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // Constants Section
  // ==============================
  const sortOptions = getSortOptions(listType); // Get sort options based on the list type

  // ==============================
  // Actions Section
  // ==============================
  const setSort = (value) => dispatch(setSortType(value));
  const setList = (value) => dispatch(setListType(value));
  const setSearch = (value) => dispatch(setSearchTerm(value));
  const setProduct = (value) => dispatch(setProductMode(value));
  const setCategory = (value) => dispatch(setCategoryMode(value));

  return {
    product: {
      mode: productMode,
      setMode: setProduct,
    },
    category: {
      mode: categoryMode,
      setMode: setCategory,
    },
    sort: {
      type: sortType,
      options: sortOptions,
      set: setSort,
    },
    list: {
      type: listType,
      set: setList,
    },
    search: {
      term: searchTerm,
      set: setSearch,
    },
  };
}
