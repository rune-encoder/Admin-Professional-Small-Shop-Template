// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import {
  selectCurrentProduct,
  selectProductEditMode,
} from "../../features/products/productSelectors";

// Import Components
import ItemView from "./ItemView";
import ItemEdit from "./ItemEdit";

export default function ItemDetails() {
  const selectedProduct = useSelector(selectCurrentProduct);
  const productEditMode = useSelector(selectProductEditMode);

  return (
    <div className="window__content--wrapper col-sm-12 col-md-5">
      {selectedProduct && (
        <div className="selected-item-details">
          <section className="item-details__top-section">
            <img className="item__image" src="https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043"></img>
          </section>

          <section className="item-details__bottom-section">
            {productEditMode ? <ItemEdit /> : <ItemView />}
          </section>
        </div>
      )}
    </div>
  );
}