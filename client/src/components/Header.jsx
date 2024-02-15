import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiUserCircleLight } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

import { GrClose } from "react-icons/gr";

export default function Header(props) {
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

        <div>Admin Portal</div>

        <div className="mini-nav-bar">
          <div className="mini-nav-text-group">
            <span className="mini-nav-username">Username</span>
            <span className="header-subtle-text ">Permission</span>
          </div>

          <PiUserCircleLight className="mini-nav-user-icon" />

          <div className="dropdown-container">
            {isDropdownOpen ? (
              <GrClose 
                className="mini-nav-toggle-icon"
                onClick={toggleDropdown}
              />
            ) : (
              <RxHamburgerMenu
                className="mini-nav-toggle-icon"
                onClick={toggleDropdown}
              />
            )}

            {/* <=== Dropdown menu content ===> */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {props.children} {/* Light and Dark Mode */}
                <button className="dropdown-menu-items">
                  <IoLogOutOutline /> Logout
                </button>
                <span className="header-subtle-text ">
                  Build Version v1.0.0 beta
                </span>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

// ! DELETE LATER

{
  /* <Navbar
links={links}
isLinkDisabled={isLinkDisabled}
toggleSlidingMenu={toggleSlidingMenu}
/> */
}

{
  /* <aside
className={`sliding-menu-content ${
  isSlidingMenuOpen ? "sliding-menu-open" : ""
}`}
>
<NavLinks links={links} isLinkDisabled={isLinkDisabled} />
</aside> */
}
