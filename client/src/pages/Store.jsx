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
        <div className="window__body">
          <div className="window__toolbar row-no-gutters">
            <button className="toolbar__button col-2">
              <PiArrowsDownUpLight /> Sort
            </button>
            <button className="toolbar__button col-2">
              <IoIosAddCircleOutline /> New
            </button>
            <button className="toolbar__button col-2">
              <IoIosArrowDown /> View
            </button>
            <div className="toolbar__searchbar col-6">
              <IoIosSearch />
              <input type="text" placeholder="Search" />
            </div>
          </div>

          <div className="window__content row-no-gutters">
            <div className="col-4 cbg">
              <h6>Content</h6>
              <div>Some content....</div>
            </div>

            <div className="col-sm-8 col-xs-12 cbg table--wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>01/01/10</td>
                      <td>{product.quantity}</td>
                      <td>{product.category.name}</td>
                      <td>
                        <button>
                          <FiEdit />
                        </button>
                        <button>
                          <BsTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
