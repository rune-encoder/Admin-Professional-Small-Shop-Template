import { useState } from "react";
import { Link } from "react-router-dom";
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
  // <======= STATE SIDEBAR: (MOUSE HOVER) =======>
  const [isHovered, setIsHovered] = useState(false);

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
          <section className="sidebar-menu__section">
            <div className="sidebar-menu__hover-filler"></div>
            <button className="sidebar-menu__button">
              <MdOutlineStore /> Store
            </button>
            <button className="sidebar-menu__button">
              <MdOutlineCategory /> Categories
            </button>
            <button className="sidebar-menu__button">
              <MdOutlineShoppingCart /> Products
            </button>
          </section>
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
