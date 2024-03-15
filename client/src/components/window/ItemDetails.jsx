import { useSelector } from "react-redux";
import { selectSelectedProduct } from "../../features/productsSlice";

import ItemView from "./ItemView";
import ItemEdit from "./ItemEdit";

export default function ItemDetails({ editMode }) {
  const selectedProduct = useSelector(selectSelectedProduct);

  return (
    <div className="window__content--wrapper col-sm-12 col-md-5">
      {selectedProduct && (
        <div className="selected-item-details">
          <section className="item-details__top-section">
            <img className="item__image" src={selectedProduct.image.url}></img>
          </section>

          <section className="item-details__bottom-section">
            {editMode ? (
              <>
                <ItemEdit />
              </>
            ) : (
              <>
                <ItemView />
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
