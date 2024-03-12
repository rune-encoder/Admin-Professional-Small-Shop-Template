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
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline 
} from "react-icons/io";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

// !Revisit: INCOMPLETE ====================================
export default function Home(props) {
  const [selectedProduct, setSelectedProduct] = useState(false);
  console.log("selectedProduct", selectedProduct);

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

  console.log(products);

  // !Revisit: INCOMPLETE ====================================
  return (
    <>
      <div className="window container">
        <h6 className="window__bar">Placeholder</h6>
        <div className="window__body">
          <div className="toolbar row-no-gutters">
            <button className="toolbar__btn col-2">
              <IoIosAddCircleOutline /> New
            </button>
            <button className="toolbar__btn col-2">
              <PiArrowsDownUpLight /> Sort
            </button>
            <button className="toolbar__btn col-2">
              <IoIosArrowDown /> View
            </button>
            <div className="toolbar__searchbar col-6">
              <IoIosSearch />
              <input type="text" placeholder="Search" />
            </div>
          </div>

          <div className="window__content row-no-gutters">
            <div className="window__content--wrapper col-md-5 col-sm-4 col-xs-12">
              {selectedProduct && (
                <>
                  <div className="window__details">
                    <section className="details__top-section">
                      <img
                        className="details__image"
                        src={selectedProduct.image.url}
                      ></img>
                    </section>
                    <section className="details__bottom-section">
                      <div className="details__title-group--wrapper row-no-gutters">
                        <span className="details__title col-xs-6 col-sm-12 col-md-6">
                          <MdOutlineShoppingCart /> {selectedProduct.name}
                        </span>
                        <span className="details__subtitle col-xs-6 col-sm-12 col-md-6">
                          <MdOutlineCategory /> {selectedProduct.category.name}
                        </span>
                      </div>

                      <div className="details__item-group--wrapper row-no-gutters">
                        <div className="col-xs-6 col-sm-12 col-md-6">
                          <div className="details__item--wrapper">
                            <span className="details__item">
                              <span className="item-label">In Stock:</span>
                              <span className="item-value">
                                {selectedProduct.inStock ? (
                                  <IoMdCheckmarkCircleOutline data-boolean='true' />
                                ) : (
                                  <IoMdCloseCircleOutline data-boolean='false' />
                                )}
                              </span>
                            </span>
                            <span className="details__item">
                              <span className="item-label">Featured:</span>
                              <span className="item-value">
                                {selectedProduct.isFeatured ? (
                                  <IoMdCheckmarkCircleOutline data-boolean='true' />
                                ) : (
                                  <IoMdCloseCircleOutline data-boolean='false' />
                                )}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="col-xs-6 col-sm-12 col-md-6">
                          <div className="details__item--wrapper">
                            <span className="details__item">
                              <span className="item-label">Price:</span>
                              <span className="item-value">
                                ${selectedProduct.price}
                              </span>
                            </span>
                            <span className="details__item">
                              <span className="item-label">Quantity:</span>
                              <span className="item-value">
                                {selectedProduct.quantity}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <details className="d">
                        <summary>Description</summary>
                        <p>{selectedProduct.shortDescription}</p>
                      </details>

                      <details className="d">
                        <summary>Details</summary>
                        <p>{selectedProduct.details}</p>
                      </details>
                    </section>
                  </div>
                </>
              )}
            </div>

            <div className="window__content--wrapper col-md-7 col-sm-8 col-xs-12">
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
                      <td className="table__action-cell">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          data-action="Update"
                        >
                          <FiEdit />
                        </button>
                        <button data-action="Delete">
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
