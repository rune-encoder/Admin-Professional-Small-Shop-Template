// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectListType } from "../../../../features/toolbarSlice";

// Import Components
import { ProductsList, CategoriesList } from "./index.js";

export function Listings({ children }) {
  const listType = useSelector(selectListType);

  return (
    <div className="admin-page--wrapper">
      {children}

      {listType === "products" && <ProductsList />}

      {listType === "categories" && <CategoriesList />}
    </div>
  );
}
