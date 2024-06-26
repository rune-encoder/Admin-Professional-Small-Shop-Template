import Auth from "../../../utils/auth/auth.js";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  toggleTheme,
  selectIsDarkModeEnabled,
} from "../../../features/themeSlice.js";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  IoLogOutOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";

export function MiniNavDropdown() {
  // <======= REDUX STATE: THEME (DARK/LIGHT) =======>
  const isDarkMode = useSelector(selectIsDarkModeEnabled);
  const dispatch = useDispatch();

  // <======= STATE DROPDOWN MENU: (OPEN/CLOSE) =======>
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    /* <======= DROPDOWN MENU CONTAINER =======> */
    <div className="dropdown-menu">
      {/* <======= ICON: OPEN AND CLOSE MENU =======> */}
      {isDropdownOpen ? (
        <button className="mini-navbar__button">
          <IoIosArrowUp onClick={() => toggleDropdown()} />
        </button>
      ) : (
        <button className="mini-navbar__button">
          <IoIosArrowDown onClick={() => toggleDropdown()} />
        </button>
      )}
      {/* <======= DROPDOWN MENU CONTENT =======> */}
      {isDropdownOpen && (
        <menu className="dropdown-menu__section">
          <button
            className="dropdown-menu__button"
            onClick={() => dispatch(toggleTheme(isDarkMode))}
          >
            {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}{" "}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
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
        </menu>
      )}
    </div>
  );
}
