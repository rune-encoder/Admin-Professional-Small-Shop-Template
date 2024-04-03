// Import React Icons
import { PiArrowsDownUpLight } from "react-icons/pi";
import {
  IoIosArrowDown,
  IoIosAddCircleOutline,
  IoIosSearch,
} from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";

import { setSearchTerm, setSortType } from "../../features/toolbarSlice";

import { setProductMode } from "../../features/products/productSlice";

export default function Toolbar() {
  const dispatch = useDispatch();

  return (
    <div className="toolbar row-no-gutters">
      <button
        className="toolbar__btn col-2"
        onClick={() => dispatch(setProductMode({ mode: "new" }))}
      >
        <IoIosAddCircleOutline /> New
      </button>
      <div className="toolbar__btn col-2">
        <PiArrowsDownUpLight /> Sort
        <select onChange={(event) => dispatch(setSortType(event.target.value))}>
          <option value="none">None</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="date-asc">Date (oldest first)</option>
          <option value="date-desc">Date (newest first)</option>
          <option value="price-asc">Price (low to high)</option>
          <option value="price-desc">Price (high to low)</option>
          <option value="stock-asc">Stock (low to high)</option>
          <option value="stock-desc">Stock (high to low)</option>
        </select>
      </div>
      <button className="toolbar__btn col-2">
        <IoIosArrowDown /> View
      </button>
      <div className="toolbar__searchbar col-6">
        <IoIosSearch />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
    </div>
  );
}
