// Import React Icons
import { IoSearch } from "react-icons/io5";

export function Searchbar({ searchTerm, setSearchTerm }) {
  return (
    // Searchbar
    <div className="toolbar__searchbar">
      <IoSearch className="toolbar__searchbar-icon" />
      <input
        className="toolbar__searchbar-input"
        type="text"
        placeholder="Search"
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
