// Import Redux Hooks
import { useDispatch } from "react-redux";

// Import Custom Hooks
import { useCategoryAction } from "../../../../../hooks/useAction";

// Import Redux Actions
import { setCategoryMode } from "../../../../../features/categories/categorySlice";

// Import Redux Thunks
import { createCategory } from "../../../../../features/categories/categoryThunks";

// Import Components
import { ActionButtons } from "../../../Tools";

// Import React Icons
import { MdOutlineCategory } from "react-icons/md";

// COMPONENT: ROW TO CREATE A NEW CATEGORY
export function CreateCategory({ formState, setFormState }) {
  // ==============================
  // Custom Hooks Section
  // ==============================
  const handleCategoryAction = useCategoryAction();

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // Event Handlers Section
  // ==============================
  // Handler: Create a category.
  const handleCreateCategory = () =>
    handleCategoryAction(createCategory, formState.name);

  return (
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
      <ActionButtons type="save" onClick={handleCreateCategory} />

      {/* CANCEL CELL SECTION */}
      <ActionButtons
        type="cancel"
        onClick={() =>
          dispatch(setCategoryMode({ mode: null, category: null }))
        }
      />
    </div>
  );
}
