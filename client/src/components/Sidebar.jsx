import { Link } from "react-router-dom";
import sidebarContent from "../content/sidebarContent";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {sidebarContent.map((item) => (
        <Link to={item.path} key={item.id} className="menu-item">
          <item.icon className="menu-item-icon" />
          <span className="menu-item-text">{item.text}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
