import { useSelector, useDispatch } from "react-redux";
import { changeMenuDisplay, selectDisplayMenu } from "../features/menuSlice";

import { IoHomeOutline } from "react-icons/io5";
import { RiListCheck3 } from "react-icons/ri";
import { PiUsersFourLight } from "react-icons/pi";
import {
  MdOutlineLocalShipping,
  MdQueryStats,
} from "react-icons/md";

export default function Sidebar() {
  // <======= REDUX STATE: MENU ITEM (OPEN/CLOSE) =======>
  const activeMenu = useSelector(selectDisplayMenu);
  const dispatch = useDispatch();

  const buttons = [
    { Icon: IoHomeOutline, text: "Home", menu: "home" },
    { Icon: RiListCheck3, text: "Listings", menu: "listings" },
    { Icon: MdOutlineLocalShipping, text: "Orders", menu: "orders" },
    { Icon: MdQueryStats, text: "Reports", menu: "reports" },
    { Icon: PiUsersFourLight, text: "Admins", menu: "admins" },
  ];

  return (
    <aside className="sidebar__aside">
      {buttons.map(({ Icon, text, menu }) => (
        <button
          key={menu}
          className={`sidebar__buttons ${activeMenu === menu ? "disabled" : ""}`}
          onClick={() => dispatch(changeMenuDisplay(menu))}
        >
          <Icon className="sidebar__icon" />
          <span className="sidebar__text">{text}</span>
        </button>
      ))}
    </aside>
  );
}
