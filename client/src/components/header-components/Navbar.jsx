import { Link, useLocation } from "react-router-dom";
import NavLinks from "./NavLinks";

import { BsSearch } from "react-icons/bs";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar({ links, isLinkDisabled, toggleSlidingMenu }) {
  return (
    <div className="nav-group">
      <nav>
        <NavLinks links={links} isLinkDisabled={isLinkDisabled} />
      </nav>
      <div className="nav-utils">
        <BsSearch className="search-icon" />
        <Link
          to="/Cart"
          className={isLinkDisabled({ path: "/Cart" }) ? "active" : ""}
        >
          <LiaShoppingCartSolid className="cart-icon" />
        </Link>
        <RxHamburgerMenu
          className="sliding-menu-icon"
          onClick={() => toggleSlidingMenu()}
        />
      </div>
    </div>
  );
}
