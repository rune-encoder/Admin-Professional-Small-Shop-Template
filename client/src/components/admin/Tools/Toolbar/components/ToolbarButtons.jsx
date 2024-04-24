// Import React Hooks
import { useState } from "react";

// Import React Icons
import { PiArrowsDownUpLight } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";

export function ToolbarButtons({
  sortType,
  listType,
  sortOptions,
  categoryMode,
  setCategoryMode,
  productMode,
  setProductMode,
  children,
}) {
  // Dropdown menu open state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Currently selected sort option
  const currentOption = sortOptions.find((option) => option.value === sortType);

  return (
    <>
      {/* Toolbar Buttons */}
      <div className="toolbar-btn__wrapper ">
        <button
          className={`toolbar-btn ${
            sortType !== "none" || null ? "toolbar-btn--selected" : ""
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {sortType !== "none" || null ? (
            <>
              <currentOption.Icon />
              {currentOption.label}
            </>
          ) : (
            <>
              <PiArrowsDownUpLight />
              Sort
            </>
          )}
        </button>

        {isDropdownOpen && children}

        <button
          className={`toolbar-btn ${
            (listType === "categories" && categoryMode === "create") ||
            (listType === "products" && productMode === "create")
              ? "toolbar-btn--selected disabled"
              : ""
          }`}
          onClick={() => {
            if (listType === "categories") {
              setCategoryMode({ mode: "create", category: null });
            } else if (listType === "products") {
              setProductMode({ mode: "create", product: null });
            }
          }}
        >
          <IoAddOutline />
          Create
        </button>
      </div>
    </>
  );
}
