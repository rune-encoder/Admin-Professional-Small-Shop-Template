import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

// import { QUERY_CATEGORIES } from "../../utils/queries";

import Toolbar from "./Toolbar";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";

export default function Window() {
  const [selectedProduct, setSelectedProduct] = useState(false);
  // console.log("selectedProduct", selectedProduct);

  const [editMode, setEditMode] = useState(false);
  // console.log("editMode", editMode);

  return (
    <div className="window container">
      <h6 className="window__bar">Placeholder</h6>
      <div className="window__body">
        <Toolbar />
        <div className="window__content row-no-gutters">
          <ItemDetails
            selectedProduct={selectedProduct}
            editMode={editMode}
          />
          <ItemList
            setSelectedProduct={setSelectedProduct}
            setEditMode={setEditMode}
          />
        </div>
      </div>
    </div>
  );
}
