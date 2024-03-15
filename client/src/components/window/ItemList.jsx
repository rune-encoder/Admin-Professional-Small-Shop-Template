import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
  selectProduct,
  selectSelectedProduct,
} from "../../features/productsSlice";

export default function ItemList({ setEditMode }) {
  const selectedProduct = useSelector(selectSelectedProduct);
  console.log("selectedProduct", selectedProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <div className="window__content--wrapper col-sm-12 col-md-7">
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
            <tr key={product._id} onClick={() => dispatch(selectProduct(product))}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>01/01/10</td>
              <td>{product.quantity}</td>
              <td>{product.category.name}</td>
              <td className="table__action-cell">
                <button
                  data-action="Update"
                  onClick={(event) => {
                    event.stopPropagation();
                    setEditMode(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  data-action="Delete"
                  //   onClick={(event) => {
                  //     event.stopPropagation();
                  //     setTest(product);
                  //   }}
                >
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
