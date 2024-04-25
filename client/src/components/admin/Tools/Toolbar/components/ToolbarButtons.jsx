// Import React Hooks
import { useState } from "react";

// Import React Icons
import { PiArrowsDownUpLight } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";

export function ToolbarButtons({
  sortType,
  activeMenu,
  sortOptions,
  categoryMode,
  setCategoryMode,
  productMode,
  setProductMode,
  mode,
  setMode,
  children,
}) {
  // Dropdown menu open state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Currently selected sort option
  const currentOption = sortOptions.find((option) => option.value === sortType);

  // Toolbar Buttons
  return (
    <>
      {/* Sort Button */}
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

        {/* Dropdown Menu */}
        {isDropdownOpen && children}

        {/* Create Button */}
        <button
          className={`toolbar-btn ${
            (activeMenu === "categories" && categoryMode === "create") ||
            (activeMenu === "products" && productMode === "create") ||
            (activeMenu === "admins" && mode === "create")
              ? "toolbar-btn--selected disabled"
              : ""
          }`}
          onClick={() => {
            if (activeMenu === "categories") {
              setCategoryMode({ mode: "create", category: null });
            } else if (activeMenu === "products") {
              setProductMode({ mode: "create", product: null });
            } else if (activeMenu === "admins") {
              setMode("create");
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
