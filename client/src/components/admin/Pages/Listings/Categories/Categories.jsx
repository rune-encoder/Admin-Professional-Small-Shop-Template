// Import React Hooks
import { useEffect, useState, useRef, useCallback } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Actions
import { setCategoryMode } from "../../../../../features/categories/categorySlice";

// Import Redux Selectors
import {
  selectGetCategories,
  selectCurrentCategory,
  selectCategoryMode,
} from "../../../../../features/categories/categorySelectors";

import { selectSearchTerm, selectSortType } from "../../../../../features/toolbarSlice";

// Import Redux Thunks
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../../../features/categories/categoryThunks";

// Import Helpers
import { filterCategories } from "../../../../../utils/helpers/categories/filter";
import { sortCategories } from "../../../../../utils/helpers/categories/sort";

// Import Constraints
import { buttonConfig } from "../../../../../constants/buttonConfig";

// Import React Icons
import { MdOutlineCategory } from "react-icons/md";

export function Categories() {
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
  const selectedCategory = useSelector(selectCurrentCategory);
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
  // Helper Functions Section
  // ==============================
  // Helper function: Handle category actions (create, update, delete).
  // Used with the createCategory, updateCategory, and deleteCategory thunks.
  const handleCategoryAction = async (action, data) => {
    // Wait for the category action to completed.
    await dispatch(action(data));
    // Refresh the categories list global state by fetching the categories again. (Server or Cache).
    dispatch(getCategories());
  };

  // Helper function: Render action buttons for the category list.
  // See configuration object for the buttonConfig for button types.
  const renderButton = (type, onClick, stopPropagation = true) => {
    const { className, action, icon: Icon } = buttonConfig[type];
    return (
      <div className="item-cell--actions">
        <button
          className={className}
          data-action={action}
          onClick={(event) => {
            if (stopPropagation) event.stopPropagation();
            onClick(event);
          }}
        >
          <Icon />
          {action}
        </button>
      </div>
    );
  };

  // ==============================
  // Event Handlers Section
  // ==============================
  // Handler: Create a category.
  const handleCreateCategory = () =>
    handleCategoryAction(createCategory, formState.name);

  // Handler: Update a category.
  const handleUpdateCategory = (categoryId) =>
    handleCategoryAction(updateCategory, {
      id: categoryId,
      name: formState.name,
    });

  // Handler: Delete a category.
  const handleDeleteCategory = (categoryId) =>
    handleCategoryAction(deleteCategory, categoryId);

  // ==============================
  // Render Section
  // ==============================
  // Render a list of categories with action buttons for each category.
  const categoryRows = sortedCategories.map((category) => (
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
          {renderButton("save", () => handleUpdateCategory(category._id))}

          {/* CANCEL CELL SECTION */}
          {renderButton("cancel", () =>
            dispatch(setCategoryMode({ mode: "view", category }))
          )}
        </>
      ) : (
        <>
          {/* UPDATE CELL SECTION */}
          {renderButton("update", () =>
            dispatch(setCategoryMode({ mode: "update", category }))
          )}

          {/* DELETE CELL SECTION */}
          {renderButton("delete", () => handleDeleteCategory(category._id))}
        </>
      )}
    </div>
  ));

  // Render a category create row with action buttons for creating a new category.
  const categoryCreateRow = (
    <div className="item-row--category">
      {/* CATEGORY NAME CELL */}
      <div className="item-cell">
        <div className="item-label">
          <MdOutlineCategory />
          Category:
        </div>

        <div className="item-name--category">
          <input
            type="text"
            placeholder="new category..."
            value={formState.name}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onChange={(event) => {
              setFormState({ name: event.target.value });
            }}
          />
        </div>
      </div>

      {/* SAVE CELL SECTION */}
      {renderButton("save", handleCreateCategory, false)}

      {/* CANCEL CELL SECTION */}
      {renderButton("cancel", () =>
        dispatch(setCategoryMode({ mode: null, category: null }))
      )}
    </div>
  );

  return (
    <div className="listings">
      {categoryMode === "create" && categoryCreateRow}

      {categoryRows}
    </div>
  );
}
