import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import { QUERY_CATEGORIES } from "../utils/queries";
import { QUERY_PRODUCTS } from "../utils/queries";

import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

import { IoIosArrowDown, IoIosAddCircleOutline } from "react-icons/io";
import { PiArrowsDownUpLight } from "react-icons/pi";

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
        <h6>Placeholder</h6>
        <div className="sub-window">
          <div className="window-tools">
            <div>
              <button>
                <PiArrowsDownUpLight /> Sort
              </button>
              <button>
                <IoIosAddCircleOutline /> New
              </button>
              <button>
                <IoIosArrowDown /> View
              </button>
            </div>

            <div>
              <input type="text" placeholder="Search" />
            </div>
          </div>

          <div className="window-work">
            <div className="left">
              <h6>Content</h6>
              <div>Some content....</div>
            </div>

            <div className="right">
              <h6>List</h6>
              {products.map((product) => (
                <div key={product._id}>
                  <span>{product.name}</span>
                  <FiEdit />
                  <BsTrash />
                </div>
              ))}
            </div>
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
