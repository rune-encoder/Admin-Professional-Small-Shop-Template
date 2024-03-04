import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdLocalShipping, MdQueryStats } from "react-icons/md";

const sidebarContent = [
  {
    id: 1,
    path: "/Shop",
    icon: FaShop,
    text: "Store",
  },
  {
    id: 2,
    path: "/Orders",
    icon: MdLocalShipping,
    text: "Orders",
  },
  {
    id: 3,
    path: "/Reports",
    icon: MdQueryStats,
    text: "Reports",
  },
  {
    id: 4,
    path: "/Admins",
    icon: FaUsers,
    text: "Admins",
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar__aside">
      {sidebarContent.map((item) => (
        <Link to={item.path} key={item.id} className="sidebar__links">
          <item.icon className="sidebar__icon" />
          <span className="sidebar__text">{item.text}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
