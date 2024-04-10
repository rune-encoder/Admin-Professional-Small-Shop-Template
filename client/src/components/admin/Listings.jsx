// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectListType } from "../../features/toolbarSlice";

// Import Components
import Products from "./Products";
import Categories from "./Categories";

export default function Listings({ children }) {
  const listType = useSelector(selectListType);

  return (
    <div className="admin-page--wrapper">
      {children}

      {listType === "products" && <Products />}

      {listType === "categories" && <Categories />}
    </div>
  );
}
