// Import React Hooks
import { useEffect, useCallback } from "react";

// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Custom Hooks
import { useCategoryAction } from "../../../../../hooks/useAction";

// Import Redux Actions
import { setCategoryMode } from "../../../../../features/categories/categorySlice";

// Import Redux Selectors
import {
  selectCurrentCategory,
  selectCategoryMode,
} from "../../../../../features/categories/categorySelectors";

// Import Components
import { ActionButtons } from "../../../Tools";

// Import React Icons
import { MdOutlineCategory } from "react-icons/md";

// Import Redux Thunks
import {
  updateCategory,
  deleteCategory,
} from "../../../../../features/categories/categoryThunks";

// COMPONENT: CREATES A ROW FOR EACH CATEGORY AND HANDLES CATEGORY UPDATE/DELETE
export function CategoryRow({ category, formState, setFormState }) {
  // ==============================
  // Custom Hooks Section
  // ==============================
  const handleCategoryAction = useCategoryAction();

  // ==============================
  // useSelector Hooks Section
  // ==============================
  const selectedCategory = useSelector(selectCurrentCategory);
  const categoryMode = useSelector(selectCategoryMode);

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEffect Hooks Section
  // ==============================
  // Set the form state to the selected category's name if the categoryMode is "update" and a category is selected.
  useEffect(() => {
    if (selectedCategory && categoryMode === "update") {
      setFormState({
        name: selectedCategory.name,
      });
    }
  }, [selectedCategory, categoryMode]);

  // Reset the form state when categoryMode changes to "create"
  useEffect(() => {
    if (categoryMode === "create") {
      setFormState({
        name: "",
      });
    }
  }, [categoryMode]);

  // ==============================
  // Event Handlers Section
  // ==============================
  // Handler: Update a category.
  const handleUpdateCategory = useCallback(
    (categoryId) => {
      handleCategoryAction(updateCategory, {
        id: categoryId,
        name: formState.name,
      });
    },
    [handleCategoryAction, updateCategory, formState.name]
  );

  // Handler: Delete a category.
  const handleDeleteCategory = useCallback(
    (categoryId) => {
      handleCategoryAction(deleteCategory, categoryId);
    },
    [handleCategoryAction, deleteCategory]
  );

  return (
    <div
      key={category._id}
      className="item-row--category"
      onClick={() => {
        dispatch(setCategoryMode({ mode: "view", category }));
      }}
    >
      {/* CATEGORY NAME CELL */}
      <div className="item-cell">
        <div className="item-label">
          <MdOutlineCategory />
          Category:
        </div>

        <div className="item-name--category">
          {categoryMode === "update" &&
          selectedCategory?._id === category._id ? (
            <input
              type="text"
              value={formState.name}
              onClick={(e) => e.stopPropagation()}
              onChange={(event) => {
                setFormState({ name: event.target.value });
              }}
            />
          ) : (
            category.name
          )}
        </div>
      </div>

      {categoryMode === "update" && selectedCategory?._id === category._id ? (
        <>
          {/* SAVE CELL SECTION */}
          <ActionButtons
            type="save"
            onClick={() => handleUpdateCategory(category._id)}
          />

          {/* CANCEL CELL SECTION */}
          <ActionButtons
            type="cancel"
            onClick={() =>
              dispatch(setCategoryMode({ mode: "view", category }))
            }
          />
        </>
      ) : (
        <>
          {/* UPDATE CELL SECTION */}
          <ActionButtons
            type="update"
            onClick={() =>
              dispatch(setCategoryMode({ mode: "update", category }))
            }
          />

          {/* DELETE CELL SECTION */}
          <ActionButtons
            type="delete"
            onClick={() => handleDeleteCategory(category._id)}
          />
        </>
      )}
    </div>
  );
}
