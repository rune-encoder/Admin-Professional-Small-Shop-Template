import { PiUserCircleLight } from "react-icons/pi";

export default function MiniNavbar({ children }) {
  return (
    /* <======= DROPDOWN MENU CONTAINER =======> */
    <nav className="mini-navbar">
      {/* <======= USER NAME AND ADMIN LEVEL =======> */}
      <section className="mini-navbar__section">
        <span className="header__username">Username</span>
        <span className="header__text--subtle">Permission</span>
      </section>
      {/* <======= USER ICON =======> */}
      <PiUserCircleLight className="mini-navbar__user-icon" />
      {/* <======= RENDER MININAVDROPDOWN COMPONENT =======> */}
      {children}
    </nav>
  );
}
