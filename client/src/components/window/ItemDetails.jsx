// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectProductMode } from "../../features/products/productSelectors";

// Import Components
import ItemView from "./ItemView";
import ItemEdit from "./ItemEdit";
import ItemCreate from "./ItemCreate";

export default function ItemDetails() {
  const productMode = useSelector(selectProductMode);

  return (
    <>
      <div className="window__content--wrapper col-sm-12 col-md-5">
        {productMode === "view" && <ItemView />}
        {productMode === "update" && <ItemEdit />}
        {productMode === "new" && <ItemCreate />}
      </div>
    </>
  );
}
