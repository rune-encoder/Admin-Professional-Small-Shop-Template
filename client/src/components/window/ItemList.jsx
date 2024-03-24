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
  selectDeleteProductStatus,
  selectDeleteProductError,
} from "../../features/products/productSelectors";

// Import Redux Thunks
import {
  getProducts,
  deleteProduct,
} from "../../features/products/productThunks";

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
  // ! ==========>

  // ==============================
  // useSelector Hooks Section
  // ==============================
  const products = useSelector(selectGetProducts);
  const getProductsStatus = useSelector(selectGetProductsStatus);
  const getProductsError = useSelector(selectGetProductsError);
  const deleteProductStatus = useSelector(selectDeleteProductStatus);
  const deleteProductError = useSelector(selectDeleteProductError);

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEffect Hooks Section
  // ==============================
  useEffect(() => {
    // Fetch products from the server for the list when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (productId) => {
    // Wait for the product to be deleted
    await dispatch(deleteProduct(productId));

    // Refresh the products list global state by fetching the products again. (Server or Cache)
    dispatch(getProducts());
  };

  // !Revisit: How to show error (unauthorized etc.)
  if (getProductsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (getProductsStatus === "failed") {
    console.error(getProductsError);
  }
  // ! Revisit: ===================================^^^^

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
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteProduct(product._id);
                  }}
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
