// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectListType } from "../../../../features/toolbarSlice";

// Import Components
import { ProductsList, CategoriesList } from "./index.js";

// !====Testing====!
import { useDispatch } from "react-redux";

import { selectCurrentProduct } from "../../../../features/products/productSelectors.js";
import { selectProductMode } from "../../../../features/products/productSelectors.js";

import { ViewProduct } from "./Products/ViewProduct.jsx";
import { UpdateProduct } from "./Products/UpdateProduct.jsx";

export function Listings({ children }) {
  const listType = useSelector(selectListType);

  const currentProduct = useSelector(selectCurrentProduct);
  const productMode = useSelector(selectProductMode);

  const dataBoolean = productMode === "view" || productMode === "update";

  return (
    <>
      <div className="admin-page--wrapper">
        <div className="details--wrapper" data-boolean={dataBoolean}>
          
          {productMode === "view" && <ViewProduct />}
          {productMode === "update" && <UpdateProduct />}
        </div>


        <div className="listings--wrapper" data-boolean={dataBoolean}>
          {children} {/* Toolbar */}
          {listType === "products" && <ProductsList />} 
          {listType === "categories" && <CategoriesList />}
        </div>
      </div>
    </>
  );
}
