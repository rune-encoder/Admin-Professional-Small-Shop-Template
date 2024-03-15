// ICONS IMPORT
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import {
  IoLogOutOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/themeSlice";

import { useEffect } from "react";

import Auth from "../../utils/auth";

export default function MiniNavDropdown({ isDropdownOpen, toggleDropdown }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

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
          <button
            className="dropdown-menu__button"
            onClick={() => dispatch(toggleTheme(darkMode))}
          >
            {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}{" "}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            className="dropdown-menu__button"
            onClick={() => Auth.logout()}
          >
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
