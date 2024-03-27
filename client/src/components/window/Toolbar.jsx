// Import React Icons
import { PiArrowsDownUpLight } from "react-icons/pi";
import {
  IoIosArrowDown,
  IoIosAddCircleOutline,
  IoIosSearch,
} from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";

import { selectProductMode } from "../../features/products/productSelectors";

import { setProductMode } from "../../features/products/productSlice";


export default function Toolbar() {
  const productMode = useSelector(selectProductMode);
  const dispatch = useDispatch();

  return (
    <div className="toolbar row-no-gutters">
      <button className="toolbar__btn col-2"
      onClick={() => dispatch(setProductMode({ mode: "new" }))}
      >
        <IoIosAddCircleOutline /> New
      </button>
      <button className="toolbar__btn col-2">
        <PiArrowsDownUpLight /> Sort
      </button>
      <button className="toolbar__btn col-2">
        <IoIosArrowDown /> View
      </button>
      <div className="toolbar__searchbar col-6">
        <IoIosSearch />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
