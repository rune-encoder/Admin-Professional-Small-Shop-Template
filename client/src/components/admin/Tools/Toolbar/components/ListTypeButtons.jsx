// Import React Icons
import { MdOutlineShoppingCart, MdOutlineCategory } from "react-icons/md";

export function ListTypeButtons({
  activeMenu,
  changeMenuDisplay,
  setCategoryMode,
  setProductMode,
}) {
  return (
    <div className="list-selection">
      {/* Products Listings */}
      <button
        className={`list-selection__btn ${
          activeMenu === "products"
            ? "list-selection__btn--selected disabled"
            : ""
        }`}
        onClick={() => {
          changeMenuDisplay("products");
          setCategoryMode({ mode: null, category: null });
        }}
      >
        <MdOutlineShoppingCart />
        Products
      </button>

      {/* Categories Listings */}
      <button
        className={`list-selection__btn ${
          activeMenu === "categories"
            ? "list-selection__btn--selected disabled"
            : ""
        }`}
        onClick={() => {
          changeMenuDisplay("categories");
          setProductMode({ mode: null, product: null });
        }}
      >
        <MdOutlineCategory />
        Categories
      </button>
    </div>
  );
}
