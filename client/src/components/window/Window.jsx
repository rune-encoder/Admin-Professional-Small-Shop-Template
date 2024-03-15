import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

// import { QUERY_CATEGORIES } from "../../utils/queries";
import { QUERY_PRODUCTS } from "../../utils/queries";

import Toolbar from "./Toolbar";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";

export default function Window() {
  const [selectedProduct, setSelectedProduct] = useState(false);
  // console.log("selectedProduct", selectedProduct);

  const [editMode, setEditMode] = useState(false);
  // console.log("editMode", editMode);


  // <======= QUERY SECTION=======>
  const { loading, data, error } = useQuery(QUERY_PRODUCTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  const products = data?.getProducts || [];

  // console.log(products);

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
            products={products}
            setSelectedProduct={setSelectedProduct}
            setEditMode={setEditMode}
          />
        </div>
      </div>
    </div>
  );
}
