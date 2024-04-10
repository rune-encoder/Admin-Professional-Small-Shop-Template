// Import React Hooks
import { useEffect, useState } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Actions
import { setCategoryMode } from "../../features/categories/categorySlice";

// Import Redux Selectors
import {
  selectGetCategories,
  selectCurrentCategory,
  selectCategoryMode,
} from "../../features/categories/categorySelectors";

// Import Redux Thunks
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../features/categories/categoryThunks";

// Import React Icons
import { FiEdit } from "react-icons/fi";
import { BsSave, BsTrash } from "react-icons/bs";
import { TiCancelOutline } from "react-icons/ti";
import { MdOutlineCategory } from "react-icons/md";

export default function Categories() {
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
  // Configurations Section
  // ==============================
  // Configuration object for the buttons
  const buttonConfig = {
    save: { className: "item-cell__btn--save", action: "Save", icon: BsSave },
    cancel: {
      className: "item-cell__btn--cancel",
      action: "Cancel",
      icon: TiCancelOutline,
    },
    update: {
      className: "item-cell__btn--update",
      action: "Update",
      icon: FiEdit,
    },
    delete: {
      className: "item-cell__btn--delete",
      action: "Delete",
      icon: BsTrash,
    },
  };

  // ==============================
  // Render Section
  // ==============================
  // Render a list of categories with action buttons for each category.
  const categoryRows = categories.map((category) => (
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
