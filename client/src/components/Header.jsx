import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MiniNavbar from "./header-components/MiniNavbar";
import MiniNavDropdown from "./header-components/MiniNavDropdown";

export default function Header({ children }) {
  /* <======= MANAGE STATE DROPDOWN MENU: (OPEN/CLOSE) =======> */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="roboto-condensed-250">
        <Link to="/" className="logo">
          <h1>ᚱuᚢe Eᚢcᛟdeᚱ</h1>
        </Link>

        <span>Admin Portal</span>

        {/* <======= MINI NAVIGATION BAR: RIGHT SIDE =======> */}
        <MiniNavbar>
          <MiniNavDropdown
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            ThemeBtn={children} // Render the ThemeBtn Component
          />
        </MiniNavbar>
      </header>
    </>
  );
}
