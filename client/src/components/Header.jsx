import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Header/Navbar";
import NavLinks from "./Header/NavLinks";

export default function Header(props) {
  const location = useLocation();

  const [isSlidingMenuOpen, setIsSlidingMenuOpen] = useState(false);

  const toggleSlidingMenu = () => {
    setIsSlidingMenuOpen(!isSlidingMenuOpen);
  };

  const links = [
    { id: 1, path: "/Home", text: "Home" },
    { id: 2, path: "/About", text: "About" },
    { id: 3, path: "/Shop", text: "Shop" },
    { id: 4, path: "/Contact", text: "Contact" },
  ];

  const isLinkDisabled = (link) => {
    if (location.pathname === "/" && link.path === "/Home") {
      return true;
    }

    return link.path === location.pathname;
  };

  return (
    <>
      <header>
        <Link to="/" className="logo">
          <h1>ᚱuᚢe Eᚢcᛟdeᚱ</h1>
        </Link>
        <Navbar
          links={links}
          isLinkDisabled={isLinkDisabled}
          toggleSlidingMenu={toggleSlidingMenu}
        />
      </header>
      <aside
        className={`sliding-menu-content ${
          isSlidingMenuOpen ? "sliding-menu-open" : ""
        }`}
      >
        <NavLinks links={links} isLinkDisabled={isLinkDisabled} />
      </aside>
    </>
  );
}
