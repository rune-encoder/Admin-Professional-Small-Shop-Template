import { useSelector } from "react-redux";
import { selectAdmin } from "../../features/adminSlice";

import { PiUserCircleLight } from "react-icons/pi";

export default function MiniNavbar({ children }) {
  const adminData = useSelector(selectAdmin);

  return (
    <nav className="mini-navbar">
      <section className="mini-navbar__section">
        <span className="header__username">{adminData.username}</span>
        <span className="header__permission">{adminData.permission}</span>
      </section>
      <PiUserCircleLight className="mini-navbar__user-icon" />
      {/* <======= DROPDOWN MENU CONTAINER =======> */}
      {children}
    </nav>
  );
}
