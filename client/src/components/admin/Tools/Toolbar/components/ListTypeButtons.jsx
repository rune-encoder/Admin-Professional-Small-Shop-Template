// Import React Icons
import { MdOutlineShoppingCart, MdOutlineCategory } from "react-icons/md";

export function ListTypeButtons({
  listType,
  setListType,
  setCategoryMode,
  setProductMode,
}) {
  return (
    <div className="list-selection">
      {/* Products Listings */}
      <button
        className={`list-selection__btn ${
          listType === "products"
            ? "list-selection__btn--selected disabled"
            : ""
        }`}
        onClick={() => {
          setListType({ mode: "products" });
          setCategoryMode({ mode: null, category: null });
        }}
      >
        <MdOutlineShoppingCart />
        Products
      </button>

      {/* Categories Listings */}
      <button
        className={`list-selection__btn ${
          listType === "categories"
            ? "list-selection__btn--selected disabled"
            : ""
        }`}
        onClick={() => {
          setListType({ mode: "categories" });
          setProductMode({ mode: null, product: null });
        }}
      >
        <MdOutlineCategory />
        Categories
      </button>
    </div>
  );
}
