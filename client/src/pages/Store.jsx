import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import { QUERY_CATEGORIES } from "../utils/queries";
import { QUERY_PRODUCTS } from "../utils/queries";

import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

// !Revisit: INCOMPLETE ====================================
export default function Home(props) {
  // <======= QUERY SECTION=======>
  const { loading, data, error } = useQuery(QUERY_PRODUCTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  const products = data?.getProducts || [];

  console.log(products);

  // !Revisit: INCOMPLETE ====================================
  return (
    <>
      <div className="window">
        <h6>Products</h6>
        <div className="sub-window">
          <div>
            <div>
              <input type="text" />
              <button>Search</button>
            </div>
            <div>
              <span>view</span>
            </div>
            <div>
              <span>create</span>
            </div>
          </div>

          <div>
            <h6>List</h6>
            {products.map((product) => (
              <div key={product._id}>
                <span>{product.name}</span>
                <FiEdit />
                <BsTrash />
              </div>
            ))}
          </div>

          <div>
            something
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="window">
  <h5>Categories</h5>
  <div className="sub-window">
    <div>
      <input type="text" />
      <button>Search</button>
    </div>
    <div>
      <h6>List</h6>
      {categories.map((category) => (
        <div key={category._id}>
          <span>{category.name}</span>
          <FiEdit />
          <BsTrash />
        </div>
      ))}
    </div>
  </div>
</div> */
}
