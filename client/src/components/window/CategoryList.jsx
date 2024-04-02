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

export default function CategoryList() {
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

  // ==============================
  // Event Handlers Section
  // ==============================
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

  return (
    <>
      {categoryMode === "create" && (
        <div className="window__content--wrapper col-sm-12 col-md-5">
          <form>
            <input
              type="text"
              placeholder="Category Name"
              value={formState.name}
              onChange={(event) => {
                setFormState({ name: event.target.value });
              }}
            />
          </form>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(createCategory(formState.name));
              dispatch(getCategories());
            }}
          >
            <BsSave />
          </button>
        </div>
      )}

      <div className="window__content--wrapper col-sm-12 col-md-7">
        <button
          onClick={() => {
            setFormState({ name: "" });
            dispatch(setCategoryMode({ mode: "create", category: null }));
          }}
        >
          Create + Button
        </button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                onClick={() => {
                  dispatch(setCategoryMode({ mode: "view", category }));
                }}
              >
                <td>
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
                </td>
                <td className="table__action-cell">
                  {categoryMode === "update" &&
                  selectedCategory?._id === category._id ? (
                    <>
                      <button
                        data-action="Save"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleUpdateCategory(category._id);
                        }}
                      >
                        <BsSave />
                      </button>
                      <button
                        data-action="Cancel"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <TiCancelOutline />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        data-action="Update"
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch(
                            setCategoryMode({ mode: "update", category })
                          );
                        }}
                      >
                        <FiEdit />
                      </button>
                      <button
                        data-action="Delete"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteCategory(category._id);
                        }}
                      >
                        <BsTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
