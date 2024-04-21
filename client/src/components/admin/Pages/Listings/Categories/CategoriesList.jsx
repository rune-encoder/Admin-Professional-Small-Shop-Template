// Import React Hooks
import { useEffect, useState } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetCategories,
  selectCategoryMode,
} from "../../../../../features/categories/categorySelectors";

import {
  selectSearchTerm,
  selectSortType,
} from "../../../../../features/toolbarSlice";

// Import Redux Thunks
import { getCategories } from "../../../../../features/categories/categoryThunks";

// Import Helpers
import { filterCategories } from "../../../../../utils/helpers/categories/filter";
import { sortCategories } from "../../../../../utils/helpers/categories/sort";

// Import Components
import { CategoryCreate } from "./CategoryControls/CategoryCreate";
import { CategoryRow } from "./CategoryRow";

export function CategoriesList() {
  // ==============================
  // useState Hooks Section
  // ==============================
  const [formState, setFormState] = useState({
    name: "",
  });

  // ==============================
  // useSelector Hooks Section
  // ==============================
  const categories = useSelector(selectGetCategories);
  const categoryMode = useSelector(selectCategoryMode);

  const searchTerm = useSelector(selectSearchTerm);
  const sortType = useSelector(selectSortType);

  // ==============================
  // Processed Data Section
  // ==============================
  const filteredCategories = filterCategories(categories, searchTerm);
  const sortedCategories = sortCategories(filteredCategories, sortType);

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEffect Hooks Section
  // ==============================
  // Fetch categories from the server for the list when the component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="listings">
      {categoryMode === "create" && (
        <CategoryCreate formState={formState} setFormState={setFormState} />
      )}

      {sortedCategories.map((category) => (
        <CategoryRow
          key={category._id}
          category={category}
          formState={formState}
          setFormState={setFormState}
        />
      ))}
    </div>
  );
}
