// Summary: This hook will encapsulate the logic for fetching the categories,
// filtering the categories based on the search term,
// sorting the categories based on the sort type,
// and handling the form state for creating a new category.

// Import React Hooks
import { useEffect, useState } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetCategories,
  selectCategoryMode,
} from "../../../../../../features/categories/categorySelectors";

import {
  selectSearchTerm,
  selectSortType,
} from "../../../../../../features/toolbarSlice";

// Import Redux Thunks
import { getCategories } from "../../../../../../features/categories/categoryThunks";

// Import Helpers
import { filterCategories } from "../../../../../../utils/helpers/categories/filter";
import { sortCategories } from "../../../../../../utils/helpers/categories/sort";

export function useCategories() {
  // State for category form input
  const [formState, setFormState] = useState({
    name: "",
  });

  // Select categories and category mode from the Redux store
  const categories = useSelector(selectGetCategories);
  const categoryMode = useSelector(selectCategoryMode);

  // Select the search term and sort type from the Redux store
  const searchTerm = useSelector(selectSearchTerm);
  const sortType = useSelector(selectSortType);

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Fetch categories from the server for the list when the component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Filter categories based on the search term
  const filteredCategories = filterCategories(categories, searchTerm);

  // Sort the filtered categories based on the sort type
  const sortedCategories = sortCategories(filteredCategories, sortType);

  // Return the sorted categories, category mode, form state, and set form state setter
  return { sortedCategories, categoryMode, formState, setFormState };
}
