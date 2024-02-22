import { PiUserCircleLight } from "react-icons/pi";

export default function MiniNavbar({ children }) {
  return (
    <nav className="mini-navbar">
      <section className="mini-navbar__section">
        <span className="header__username">Username</span>
        <span className="header__text--subtle">Permission</span>
      </section>
      <PiUserCircleLight className="mini-navbar__user-icon" />
      {/* <======= DROPDOWN MENU CONTAINER =======> */}
      {children}
    </nav>
  );
}
