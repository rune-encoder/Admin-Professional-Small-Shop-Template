import { PiUserCircleLight } from "react-icons/pi";

export default function MiniNavbar({ children }) {
  return (
    /* <======= DROPDOWN MENU CONTAINER =======> */
    <div className="mini-nav-bar">
      {/* <======= USER NAME AND ADMIN LEVEL =======> */}
      <div className="mini-nav-text-group">
        <span className="mini-nav-username">Username</span>
        <span className="header-subtle-text">Permission</span>
      </div>
      {/* <======= USER ICON =======> */}
      <PiUserCircleLight className="mini-nav-user-icon" />
      {/* <======= RENDER MININAVDROPDOWN COMPONENT =======> */}
      {children}
    </div>
  );
}
