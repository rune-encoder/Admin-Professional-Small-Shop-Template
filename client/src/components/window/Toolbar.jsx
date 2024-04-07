// Import React Hooks
import { useState } from "react";

// Import Redux Hooks
import { useDispatch, useSelector } from "react-redux";

// Import Redux Actions
import { setSearchTerm, setSortType } from "../../features/toolbarSlice";
import { setProductMode } from "../../features/products/productSlice";

// Import Redux Selectors
import { selectSortType } from "../../features/toolbarSlice";

// Import React Icons
import { PiArrowsDownUpLight } from "react-icons/pi";
import { IoSearch, IoAddOutline } from "react-icons/io5";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import {
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
  FaSortNumericDown,
  FaSortNumericUpAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
} from "react-icons/fa";

export default function Toolbar({ title }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortType = useSelector(selectSortType);

  const dispatch = useDispatch();

  const sortOptions = [
    { Icon: IoMdRemoveCircleOutline, value: "none", label: "None" },
    { Icon: FaSortAlphaDown, value: "name-asc", label: "Name" },
    { Icon: FaSortAlphaUpAlt, value: "name-desc", label: "Name" },
    { Icon: FaLongArrowAltUp, value: "date-asc", label: "Date" },
    { Icon: FaLongArrowAltDown, value: "date-desc", label: "Date" },
    { Icon: FaSortNumericDown, value: "price-asc", label: "Price" },
    { Icon: FaSortNumericUpAlt, value: "price-desc", label: "Price" },
    { Icon: FaSortAmountUp, value: "stock-asc", label: "Stock" },
    { Icon: FaSortAmountDown, value: "stock-desc", label: "Stock" },
  ];

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
                <span>{currentOption.label}</span>
              </>
            ) : (
              <>
                <PiArrowsDownUpLight />
                <span>Sort</span>
              </>
            )}
          </button>

          {isDropdownOpen && dropdownMenu}

          <button className="toolbar-btn">
            <IoAddOutline />
            <span>Create</span>
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
