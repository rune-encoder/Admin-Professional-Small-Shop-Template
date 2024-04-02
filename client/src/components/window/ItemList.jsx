// Import React Hooks
import { useEffect, useRef } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Actions
import { setProductMode } from "../../features/products/productSlice";

// Import Redux Selectors
import {
  selectGetProducts,
  selectGetProductsStatus,
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
  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current = renderCount.current + 1;
  //   console.log(`ItemList has rendered ${renderCount.current} times`);
  // });
  // ! ==========>

  // ==============================
  // useSelector Hooks Section
  // ==============================
  const products = useSelector(selectGetProducts);
  const getProductsStatus = useSelector(selectGetProductsStatus);

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

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleDeleteProduct = async (product) => {
    // Get the product id and images
    let productId = product._id;
    let productImages = product.image.map(({ __typename, ...rest }) => rest);

    // Wait for the product to be deleted
    await dispatch(deleteProduct({ id: productId, images: productImages }));
    
    // Refresh the products list global state by fetching the products again. (Server or Cache)
    dispatch(getProducts());
  };

  // !Revisit: Handling Loading State
  if (getProductsStatus === "loading") {
    return <div>Loading...</div>;
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
                dispatch(setProductMode({ mode: "view", product }));
              }}
            >
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>01/01/10</td>
              <td>{product.quantity}</td>
              <td>{product.category ? product.category.name : ""}</td>
              <td className="table__action-cell">
                <button
                  data-action="Update"
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(setProductMode({ mode: "update", product }));
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  data-action="Delete"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteProduct(product);
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
