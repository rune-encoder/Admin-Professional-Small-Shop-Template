import { Link } from "react-router-dom";

import MiniNavbar from "./MiniNavbar";
import MiniNavDropdown from "./MiniNavDropdown";

export default function Header() {
  return (
    <>
      <header className="roboto-condensed-250">
        <Link to="/" className="header__logo">
          <h5>ᚱuᚢe-Eᚢcᛟdeᚱ</h5>
        </Link>

        <span className="header__title">Admin Portal</span>

        {/* <======= MINI NAVIGATION BAR: RIGHT SIDE =======> */}
        <MiniNavbar>
          <MiniNavDropdown />
        </MiniNavbar>
      </header>
    </>
  );
}
