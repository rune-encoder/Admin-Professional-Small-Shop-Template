// Import React Hooks
import { useEffect, useState, useRef } from "react";

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
import { CreateCategory } from "./CreateCategory";
import { CategoryRows } from "./CategoryRows";

export function CategoriesList() {
  // !Delete: Used to check re-renders of the component
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log(`Categories has rendered ${renderCount.current} times`);
  });
  // ! ==========>
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
        <CreateCategory formState={formState} setFormState={setFormState} />
      )}
      {
        <CategoryRows
          categories={sortedCategories}
          formState={formState}
          setFormState={setFormState}
        />
      }
    </div>
  );
}
