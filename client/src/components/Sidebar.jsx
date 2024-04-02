import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { changeMenuDisplay, selectDisplayMenu } from "../features/menuSlice";

import { FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import {
  MdLocalShipping,
  MdQueryStats,
  MdOutlineStore,
  MdOutlineCategory,
  MdOutlineShoppingCart,
} from "react-icons/md";

export default function Sidebar() {
  // <======= REDUX STATE: MENU ITEM (OPEN/CLOSE) =======>
  const activeMenu = useSelector(selectDisplayMenu);
  const dispatch = useDispatch();

  // <======= STATE SIDEBAR: (MOUSE HOVER) =======>
  const [isHovered, setIsHovered] = useState(false);

  // SIDEBAR STORE BUTTON: MENU ITEMS
  const storeMenu = [
    { name: "store", icon: <MdOutlineStore />, isOpen: activeMenu === "store" },
    {
      name: "categories",
      icon: <MdOutlineCategory />,
      isOpen: activeMenu === "categories",
    },
    {
      name: "products",
      icon: <MdOutlineShoppingCart />,
      isOpen: activeMenu === "products",
    },
  ];  

  // CREATE MENU BUTTONS FOR EACH STORE MENU ITEM
  const storeMenuMap = storeMenu.map((item) => {
    return (
      <button
        key={item.name}
        className={`sidebar-menu__button ${
          item.isOpen ? "disabled" : ""
        }`}
        disabled={activeMenu === item.name}
        onClick={() => dispatch(changeMenuDisplay(item.name))}
      >
        {item.icon} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </button>
    );
  });

  return (
    <aside className="sidebar__aside">
      <div
        className="sidebar__links"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaShop className="sidebar__icon" />
        <span className="sidebar__text">Store</span>

        {isHovered && (
          <menu className="sidebar-menu__section">
            <div className="sidebar-menu__hover-filler"></div>
            {storeMenuMap}
          </menu>
        )}
      </div>

      <Link to="/Orders" className="sidebar__links">
        <MdLocalShipping className="sidebar__icon" />
        <span className="sidebar__text">Orders</span>
      </Link>

      <Link to="/Report" className="sidebar__links">
        <MdQueryStats className="sidebar__icon" />
        <span className="sidebar__text">Report</span>
      </Link>

      <Link to="/Admins" className="sidebar__links">
        <FaUsers className="sidebar__icon" />
        <span className="sidebar__text">Admins</span>
      </Link>
    </aside>
  );
}
