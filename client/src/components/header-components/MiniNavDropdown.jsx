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
    <div className="dropdown-container">
      {/* <======= ICON: OPEN AND CLOSE MENU =======> */}
      {isDropdownOpen ? (
        <GrClose
          className="mini-navbar__toggle-icon"
          onClick={toggleDropdown}
        />
      ) : (
        <RxHamburgerMenu
          className="mini-navbar__toggle-icon"
          onClick={toggleDropdown}
        />
      )}
      {/* <======= DROPDOWN MENU CONTENT =======> */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {ThemeBtn} {/* ThemeBtn Component */}
          <button className="dropdown-menu__buttons">
            <IoLogOutOutline /> Logout
          </button>
          <span className="header__text--subtle">
            Build Version v1.0.0 beta
          </span>
        </div>
      )}
    </div>
  );
}
