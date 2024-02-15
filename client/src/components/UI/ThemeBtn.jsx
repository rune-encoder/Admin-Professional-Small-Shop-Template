import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function ThemeBtn({ darkMode, toggleDarkMode }) {
  return (
    <>
      <button className="dropdown-menu-items" onClick={toggleDarkMode}>
        {darkMode ? <IoSunnyOutline  /> : <IoMoonOutline />}{" "}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </>
  );
}
