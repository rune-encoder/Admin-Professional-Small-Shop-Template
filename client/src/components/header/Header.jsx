import { useState } from "react";
import { Link } from "react-router-dom";

import MiniNavbar from "./MiniNavbar";
import MiniNavDropdown from "./MiniNavDropdown";

export default function Header({ children, adminData }) {
  // <======= MANAGE STATE DROPDOWN MENU: (OPEN/CLOSE) =======> 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="roboto-condensed-250">
        <Link to="/" className="header__logo">
          <h5>ᚱuᚢe-Eᚢcᛟdeᚱ</h5>
        </Link>

        <span className="header__title">Admin Portal</span>

        {/* <======= MINI NAVIGATION BAR: RIGHT SIDE =======> */}
        <MiniNavbar adminData={adminData}>
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
