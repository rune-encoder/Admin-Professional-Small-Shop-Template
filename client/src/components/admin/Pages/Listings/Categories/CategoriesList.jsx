// Import Custom Hooks
import { useCategories } from "./hooks/useCategories";

// Import Components
import { CategoryCreate } from "./CategoryControls/CategoryCreate";
import { CategoryRow } from "./CategoryRow";

export function CategoriesList() {
  const { sortedCategories, categoryMode, formState, setFormState } =
    useCategories();

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
