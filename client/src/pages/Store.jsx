import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import { QUERY_CATEGORIES } from "../utils/queries";
import { QUERY_PRODUCTS } from "../utils/queries";

import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

import {
  IoIosArrowDown,
  IoIosAddCircleOutline,
  IoIosSearch,
} from "react-icons/io";
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
      <div className="window container">
        <h6 className="window__bar">Placeholder</h6>
        <div className="window__content">
          <div className="window__toolbar row-no-gutters">
            <button className="toolbar__button col-2 cbg">
              <PiArrowsDownUpLight /> Sort
            </button>
            <button className="toolbar__button col-2 cbg">
              <IoIosAddCircleOutline /> New
            </button>
            <button className="toolbar__button col-2 cbg">
              <IoIosArrowDown /> View
            </button>
            <div className="toolbar__searchbar col-6 cbg">
              <IoIosSearch />
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
