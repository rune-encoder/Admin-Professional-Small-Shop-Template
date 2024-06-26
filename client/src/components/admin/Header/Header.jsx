import { MiniNavbar, MiniNavDropdown } from "./index.js";

export function Header() {
  return (
    <>
      <header>
        <div className="header__logo">
          <h5>ᚱuᚢe-Eᚢcᛟdeᚱ</h5>
        </div>

        <span className="header__title">Admin Portal</span>

        {/* <======= MINI NAVIGATION BAR: RIGHT SIDE =======> */}
        <MiniNavbar>
          <MiniNavDropdown />
        </MiniNavbar>
      </header>
    </>
  );
}
