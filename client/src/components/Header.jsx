import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

export default function Header(props) {
  const location = useLocation();

  // const [isSlidingMenuOpen, setIsSlidingMenuOpen] = useState(false);

  // const toggleSlidingMenu = () => {
  //   setIsSlidingMenuOpen(!isSlidingMenuOpen);
  // };

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
            <span className="mini-nav-admin-level">Permission</span>
          </div>

          <FaUserCircle className="mini-nav-user-icon" />

          <RxHamburgerMenu className="mini-nav-toggle-icon" />
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
