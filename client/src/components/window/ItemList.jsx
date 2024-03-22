// Import React Hooks
import { useEffect, useRef } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Actions
import {
  currentProduct,
  toggleProductEditMode,
} from "../../features/products/productSlice";

// Import Redux Selectors
import {
  selectGetProducts,
  selectGetProductsStatus,
  selectGetProductsError,
} from "../../features/products/productSelectors";

// Import Redux Thunks
import { getProducts } from "../../features/products/productThunks";

// Import React Icons
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

export default function ItemList() {
  // !Delete: Used to check re-renders
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log(`ItemList has rendered ${renderCount.current} times`);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector(selectGetProducts);
  const status = useSelector(selectGetProductsStatus);
  const error = useSelector(selectGetProductsError);

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
            <tr
              key={product._id}
              onClick={() => {
                dispatch(toggleProductEditMode(false));
                dispatch(currentProduct(product));
              }}
            >
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
                    dispatch(toggleProductEditMode(true));
                    dispatch(currentProduct(product));
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
