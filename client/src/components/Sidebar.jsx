import { useState, useEffect } from "react";
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

// const sidebarContent = [
//   {
//     id: 1,
//     path: "/Shop",
//     icon: FaShop,
//     text: "Store",
//   },
//   {
//     id: 2,
//     path: "/Orders",
//     icon: MdLocalShipping,
//     text: "Orders",
//   },
//   {
//     id: 3,
//     path: "/Reports",
//     icon: MdQueryStats,
//     text: "Reports",
//   },
//   {
//     id: 4,
//     path: "/Admins",
//     icon: FaUsers,
//     text: "Admins",
//   },
// ];

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <aside className="sidebar__aside">
      <div
        className="sidebar__links"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
        <FaShop className="sidebar__icon" />
        <span className="sidebar__text">Shop</span>

        {isHovered && (
          <section className="sidebar-menu__section">
            <div className="sidebar-menu__hover-filler"></div>
            <button className="sidebar-menu__button">
              <MdOutlineStore /> Shop
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
};

{
  /* <aside className="sidebar__aside">
{sidebarContent.map((item) => (
  <Link to={item.path} key={item.id} className="sidebar__links">
    <item.icon className="sidebar__icon" />
    <span className="sidebar__text">{item.text}</span>
  </Link>
))}
</aside> */
}

export default Sidebar;
