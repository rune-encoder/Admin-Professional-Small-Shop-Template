// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectListType } from "../../../../features/toolbarSlice";


// Import Redux Selectors
import { selectProductMode } from "../../../../features/products/productSelectors.js";

// Import Components
import { ProductsList, CategoriesList } from "./index.js";
import { ProductView, ProductControl } from "./Products/ProductControls"

export function Listings({ children }) {
  const listType = useSelector(selectListType);

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

        <div className="listings--wrapper" data-boolean={dataBoolean}>
          {/* Toolbar */}
          {children}
          {listType === "products" && <ProductsList />}
          {listType === "categories" && <CategoriesList />}
        </div>
      </div>
    </>
  );
}
