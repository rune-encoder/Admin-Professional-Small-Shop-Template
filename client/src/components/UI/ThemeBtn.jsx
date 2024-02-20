import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function ThemeBtn({ darkMode, toggleDarkMode }) {
  return (
    <>
      {/* <======= THEME MODE SWITCH: (LIGHT/DARK) =======> */}
      <button className="dropdown-menu__buttons" onClick={toggleDarkMode}>
        {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}{" "}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </>
  );
}
