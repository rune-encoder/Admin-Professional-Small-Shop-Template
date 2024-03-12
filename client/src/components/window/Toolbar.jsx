import { PiArrowsDownUpLight } from "react-icons/pi";
import {
  IoIosArrowDown,
  IoIosAddCircleOutline,
  IoIosSearch,
} from "react-icons/io";

export default function Toolbar() {
  return (
    <div className="toolbar row-no-gutters">
      <button className="toolbar__btn col-2">
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
