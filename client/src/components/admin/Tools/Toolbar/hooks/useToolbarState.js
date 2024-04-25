// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Selectors
import { selectProductMode } from "../../../../../features/products/productSelectors";
import { selectCategoryMode } from "../../../../../features/categories/categorySelectors";
import { selectDisplayMenu } from "../../../../../features/menuSlice";

// Import Redux Actions
import { setCategoryMode } from "../../../../../features/categories/categorySlice";
import { setProductMode } from "../../../../../features/products/productSlice";
import { changeMenuDisplay } from "../../../../../features/menuSlice";
import {
  setSearchTerm,
  setSortType,
} from "../../../../../features/toolbarSlice";

// Import Redux Selectors
import {
  selectSortType,
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
  const activeMenu = useSelector(selectDisplayMenu); // Active menu: "products", "categories", etc.
  const searchTerm = useSelector(selectSearchTerm); // Search term

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // Constants Section
  // ==============================
  const sortOptions = getSortOptions(activeMenu); // Get sort options based on the list type

  // ==============================
  // Actions Section
  // ==============================
  const setSort = (value) => dispatch(setSortType(value));
  const setMenu = (value) => dispatch(changeMenuDisplay(value));
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
    list: {
      type: activeMenu,
      set: setMenu,
    },
    search: {
      term: searchTerm,
      set: setSearch,
    },
    sort: {
      type: sortType,
      options: sortOptions,
      set: setSort,
    },
  };
}
