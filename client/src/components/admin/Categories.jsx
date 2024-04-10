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
  useEffect(() => {
    // Fetch categories from the server for the list when the component mounts
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    // Set the form state to the selected category's name
    if (selectedCategory && categoryMode === "update") {
      setFormState({
        name: selectedCategory.name,
      });
    }
  }, [selectedCategory, categoryMode]);

  useEffect(() => {
    // Reset the form state when categoryMode changes to "create"
    if (categoryMode === "create") {
      setFormState({
        name: "",
      });
    }
  }, [categoryMode]);

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleCreateCategory = async () => {
    // Wait for the category to be created.
    await dispatch(createCategory(formState.name));

    // Refresh the categories list global state by fetching the categories again. (Server or Cache).
    dispatch(getCategories());
  };

  const handleUpdateCategory = async (categoryId) => {
    // Wait for the category to be updated.
    await dispatch(updateCategory({ id: categoryId, name: formState.name }));

    // Refresh the categories list global state by fetching the categories again. (Server or Cache).
    dispatch(getCategories());
  };

  const handleDeleteCategory = async (categoryId) => {
    // Wait for the category to be deleted..
    await dispatch(deleteCategory(categoryId));

    // Refresh the categories list global state by fetching the categories again. (Server or Cache).
    dispatch(getCategories());
  };

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
          <div className="item-cell--actions">
            <button
              className="item-cell__btn--save"
              data-action="Save"
              onClick={(event) => {
                event.stopPropagation();
                handleUpdateCategory(category._id);
              }}
            >
              <BsSave />
              Save
            </button>
          </div>

          {/* CANCEL CELL SECTION */}
          <div className="item-cell--actions">
            <button
              className="item-cell__btn--cancel"
              data-action="Cancel"
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setCategoryMode({ mode: "view", category }));
              }}
            >
              <TiCancelOutline />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* UPDATE CELL SECTION */}
          <div className="item-cell--actions">
            <button
              className="item-cell__btn--update"
              data-action="Update"
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setCategoryMode({ mode: "update", category }));
              }}
            >
              <FiEdit />
              Update
            </button>
          </div>

          {/* DELETE CELL SECTION */}
          <div className="item-cell--actions">
            <button
              className="item-cell__btn--delete"
              data-action="Delete"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteCategory(category._id);
              }}
            >
              <BsTrash />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  ));

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
      <div className="item-cell--actions">
        <button
          className="item-cell__btn--save"
          data-action="Save"
          onClick={async (e) => {
            e.preventDefault();
            handleCreateCategory();
          }}
        >
          <BsSave />
          Save
        </button>
      </div>

      {/* CANCEL CELL SECTION */}
      <div className="item-cell--actions">
        <button
          className="item-cell__btn--cancel"
          data-action="Cancel"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(setCategoryMode({ mode: null, category: null }));
          }}
        >
          <TiCancelOutline />
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="listings">
      {categoryMode === "create" && categoryCreateRow}

      {categoryRows}
    </div>
  );
}
