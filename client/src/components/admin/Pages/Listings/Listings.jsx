// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectDisplayMenu } from "../../../../features/menuSlice";
import { selectProductMode } from "../../../../features/products/productSelectors.js";

// Import Components
import { ProductsList, CategoriesList } from "./index.js";
import { ProductView, ProductControl } from "./Products/ProductControls";

export function Listings({ children }) {
  const activeMenu = useSelector(selectDisplayMenu);

  const productMode = useSelector(selectProductMode);

  const dataBoolean =
    productMode === "view" ||
    productMode === "update" ||
    productMode === "create";

  return (
    <>
      <div className="admin-page--wrapper">
        <div className="control-item--wrapper" data-boolean={dataBoolean}>
          {productMode === "view" && <ProductView />}
          {productMode === "create" || productMode === "update" ? (
            <ProductControl />
          ) : null}
        </div>

        <div className="list--wrapper" data-boolean={dataBoolean}>
          {/* Toolbar */}
          {children}
          {activeMenu === "products" && <ProductsList />}
          {activeMenu === "categories" && <CategoriesList />}
        </div>
      </div>
    </>
  );
}
