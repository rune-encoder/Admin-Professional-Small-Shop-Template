// ICONS IMPORT
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";

export default function MiniNavDropdown({
  isDropdownOpen,
  toggleDropdown,
  ThemeBtn,
}) {
  return (
    /* <======= DROPDOWN MENU CONTAINER =======> */
    <div className="dropdown-menu">
      {/* <======= ICON: OPEN AND CLOSE MENU =======> */}
      {isDropdownOpen ? (
        <button className="mini-navbar__button">
          <GrClose onClick={toggleDropdown} />
        </button>
      ) : (
        <button className="mini-navbar__button">
          <RxHamburgerMenu onClick={toggleDropdown} />
        </button>
      )}
      {/* <======= DROPDOWN MENU CONTENT =======> */}
      {isDropdownOpen && (
        <section className="dropdown-menu__section">
          {ThemeBtn} {/* ThemeBtn Component */}
          <button className="dropdown-menu__button">
            <IoLogOutOutline /> Logout
          </button>
          <span className="header__text--subtle">
            Build Version v1.0.0 beta
          </span>
        </section>
      )}
    </div>
  );
}
