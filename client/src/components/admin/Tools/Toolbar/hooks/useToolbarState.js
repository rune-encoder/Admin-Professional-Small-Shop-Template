// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Selectors
// Selector to select the product mode: "view", "update", "create", etc.
import { selectProductMode } from "../../../../../features/products/productSelectors";

// Selector to select the category mode: "view", "update", "create", etc.
import { selectCategoryMode } from "../../../../../features/categories/categorySelectors";

// Import Redux Actions
// Action to set the category mode and current category
// Ex. setCategoryMode({ mode: "view", category: category })
import { setCategoryMode } from "../../../../../features/categories/categorySlice";

// Action to set the product mode and current product
// Ex. setProductMode({ mode: "view", product: product })
import { setProductMode } from "../../../../../features/products/productSlice";

// Actions for toolbar to set the list type, search term, and sort type
import {
  setListType,
  setSearchTerm,
  setSortType,
} from "../../../../../features/toolbarSlice";

// Import Redux Selectors
// Selectors to select the toolbar's sort type, list type, and search term
import {
  selectSortType,
  selectListType,
  selectSearchTerm,
} from "../../../../../features/toolbarSlice";

// Import Constants
// Constraints for the sort options depend on the list type.
import { getSortOptions } from "../../../../../constants/sortOptions";

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
