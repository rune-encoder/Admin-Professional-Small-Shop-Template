import { useSelector, useDispatch } from "react-redux";
import {
  changeMenuDisplay,
  selectDisplayMenu,
} from "../../../features/menuSlice";

import { btnSidebarConfig as buttons } from "../../../constants/buttonConfig";

export function Sidebar() {
  // <======= REDUX STATE: MENU ITEM (OPEN/CLOSE) =======>
  const activeMenu = useSelector(selectDisplayMenu);
  const dispatch = useDispatch();

  return (
    <aside className="sidebar__aside">
      {buttons.map(({ Icon, text, menu, disabled }) => (
        <button
          key={menu}
          className={`sidebar__buttons ${
            disabled && disabled(activeMenu) ? "disabled" : ""
          }`}
          onClick={() => dispatch(changeMenuDisplay(menu))}
        >
          <Icon className="sidebar__icon" />
          <span className="sidebar__text">{text}</span>
        </button>
      ))}
    </aside>
  );
}
