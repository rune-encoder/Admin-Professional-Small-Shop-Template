import { Link } from "react-router-dom";
import sidebarContent from "../content/sidebarContent";

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
