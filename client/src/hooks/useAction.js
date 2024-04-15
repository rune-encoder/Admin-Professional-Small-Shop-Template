import { useDispatch } from "react-redux";
import { getCategories } from "../features/categories/categoryThunks";

// Custom hook for handling category actions.
// Used with the createCategory, updateCategory, and deleteCategory thunks.
export const useCategoryAction = () => {
  const dispatch = useDispatch();

  const handleCategoryAction = async (action, data) => {
    // Wait for the category action to completed.
    await dispatch(action(data));
    // Refresh the categories list global state by fetching the categories again. (Server or Cache).
    dispatch(getCategories());
  };

  return handleCategoryAction;
};
