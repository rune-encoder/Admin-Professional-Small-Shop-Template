// !Refactor: Organize and clean up code.

// Import React Hooks
import { useState } from "react";

// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Actions
import { setSearchTerm, setSortType } from "../../../features/toolbarSlice";
import { setProductMode } from "../../../features/products/productSlice";
import { setCategoryMode } from "../../../features/categories/categorySlice";
import { setListType } from "../../../features/toolbarSlice";

// Import Redux Selectors
import { selectSortType, selectListType } from "../../../features/toolbarSlice";
import { selectProductMode } from "../../../features/products/productSelectors";
import { selectCategoryMode } from "../../../features/categories/categorySelectors";

// Import Constants
import { getSortOptions } from "../../../constants/sortOptions";

// Import React Icons
import { MdOutlineShoppingCart, MdOutlineCategory } from "react-icons/md";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { IoSearch, IoAddOutline } from "react-icons/io5";

export function Toolbar({ title }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const productMode = useSelector(selectProductMode);
  const categoryMode = useSelector(selectCategoryMode);

  const sortType = useSelector(selectSortType);
  const listType = useSelector(selectListType);

  const dispatch = useDispatch();

  const sortOptions = getSortOptions(listType);

  const dropdownMenu = (
    <>
      <menu className="toolbar__dropdown-menu">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={`toolbar__dropdown-menu-btn ${
              sortType === option.value ? "disabled" : ""
            }`}
            onClick={() => dispatch(setSortType(option.value))}
          >
            <option.Icon />
            {option.label}
          </button>
        ))}
      </menu>
    </>
  );

  const currentOption = sortOptions.find((option) => option.value === sortType);

  return (
    <div className="toolbar">
      <div className="toolbar-title__section">
        <span className="toolbar-title">{title}</span>

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

          {isDropdownOpen && dropdownMenu}

          <button
            className={`toolbar-btn ${
              (listType === "categories" && categoryMode === "create") ||
              (listType === "products" && productMode === "create")
                ? "toolbar-btn--selected disabled"
                : ""
            }`}
            onClick={() => {
              if (listType === "categories") {
                dispatch(setCategoryMode({ mode: "create", category: null }));
              } else if (listType === "products") {
                dispatch(setProductMode({ mode: "create", product: null }));
              }
            }}
          >
            <IoAddOutline />
            Create
          </button>
        </div>
      </div>

      <div className="toolbar__searchbar">
        <IoSearch className="toolbar__searchbar-icon" />
        <input
          className="toolbar__searchbar-input"
          type="text"
          placeholder="Search"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      <div className="list-selection">
        <button
          className={`list-selection__btn ${
            listType === "products"
              ? "list-selection__btn--selected disabled"
              : ""
          }`}
          onClick={() => dispatch(setListType({ mode: "products" }))}
        >
          <MdOutlineShoppingCart />
          Products
        </button>
        <button
          className={`list-selection__btn ${
            listType === "categories"
              ? "list-selection__btn--selected disabled"
              : ""
          }`}
          onClick={() => dispatch(setListType({ mode: "categories" }))}
        >
          <MdOutlineCategory />
          Categories
        </button>
      </div>
    </div>
  );
}

// !Erase when not needed.
// {/* <button
//   className="toolbar__btn col-2"
//   onClick={() => dispatch(setProductMode({ mode: "new" }))}
// >
//   <IoIosAddCircleOutline /> New
// </button>
// <div className="toolbar__btn col-2">
//   <PiArrowsDownUpLight /> Sort
//   <select onChange={(event) => dispatch(setSortType(event.target.value))}>
//     <option value="none">None</option>
//     <option value="name-asc">Name (A-Z)</option>
//     <option value="name-desc">Name (Z-A)</option>
//     <option value="date-asc">Date (oldest first)</option>
//     <option value="date-desc">Date (newest first)</option>
//     <option value="price-asc">Price (low to high)</option>
//     <option value="price-desc">Price (high to low)</option>
//     <option value="stock-asc">Stock (low to high)</option>
//     <option value="stock-desc">Stock (high to low)</option>
//   </select>
// </div>
// <button className="toolbar__btn col-2">
//   <IoIosArrowDown /> View
// </button>
// <div className="toolbar__searchbar col-6">
//   <IoIosSearch />
//   <input
//     type="text"
//     placeholder="Search"
//     onChange={(e) => dispatch(setSearchTerm(e.target.value))}
//   />
// </div> */}
