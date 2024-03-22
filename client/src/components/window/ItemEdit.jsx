// Import React Hooks
import { useState, useEffect, useRef } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetCategories,
  selectGetCategoriesStatus,
  selectGetCategoriesError,
} from "../../features/categories/categorySelectors";

import {
  selectCurrentProduct,
  selectUpdateProduct,
  selectUpdateProductStatus,
  selectUpdateProductError,
} from "../../features/products/productSelectors";

// Import Redux Thunks
import { getCategories } from "../../features/categories/categoryThunks";
import { updateProduct } from "../../features/products/productThunks";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";

export default function ItemView() {
  // !Delete: Used to check re-renders
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log(`ItemEdit has rendered ${renderCount.current} times`);
  });

  // useState Hooks
  // Initialize formState with an empty object
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    isFeatured: false,
    shortDescription: "",
    details: "",
  });

  // useSelector Hooks
  const selectedProduct = useSelector(selectCurrentProduct);
  const categories = useSelector(selectGetCategories);
  const status = useSelector(selectGetCategoriesStatus);
  const error = useSelector(selectGetCategoriesError);
  // const product = useSelector(selectUpdateProduct);

  // !Delete
  // console.log("selectedProduct", selectedProduct);
  // console.log("categories", categories);
  // console.log("formState", formState);

  // useDispatch Hooks
  const dispatch = useDispatch();

  // useEffect Hooks
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setFormState({
      name: selectedProduct.name,
      category: selectedProduct.category._id,
      price: selectedProduct.price,
      quantity: selectedProduct.quantity,
      isFeatured: selectedProduct.isFeatured,
      shortDescription: selectedProduct.shortDescription,
      details: selectedProduct.details,
    });
  }, [selectedProduct]);

  // Event Handlers
  const handleInputChange = async (event) => {
    const { name, type, checked } = event.target;
    const value = type === "checkbox" ? checked : event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ input: formState });
  };

  // ! Revisit, Handle Loading and Error States
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <form className="product-edit__form" onSubmit={handleSubmit}>
      <div className="product-edit__label-group">
        <label className="product-edit__label-icon">
          <MdOutlineShoppingCart />
          Product Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="product-edit__label-group">
        <label className="product-edit__label-icon">
          <MdOutlineCategory />
          Category:
        </label>
        <select
          name="category"
          value={formState.category}
          onChange={handleInputChange}
        >
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="custom-row--wrapper row-no-gutters">
        <div className="col-lg-9 col-md-12 col-sm-5">
          <div className="custom-column--wrapper">
            <div className="product-edit__label-group">
              <label className="item-label">Price:</label>
              <input
                type="number"
                name="price"
                value={formState.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="product-edit__label-group">
              <label className="item-label">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formState.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="product-edit__label-group">
              <label className="item-label">Featured:</label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formState.isFeatured}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-12 col-sm-5">
          <div className="custom-column--wrapper">
            <button className="product-edit__btn" type="submit">
              <BsSave />
              Save
            </button>
            <button className="product-edit__btn" type="button">
              <IoArrowBackCircleOutline />
              Cancel
            </button>
            <button className="product-edit__btn" type="button">
              <BsTrash />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="product-edit__description">
        <label className="">Description: </label>
        <textarea
          name="shortDescription"
          value={formState.shortDescription}
          onChange={handleInputChange}
        />
      </div>

      <div className="product-edit__description">
        <label>Details:</label>
        <textarea
          name="details"
          value={formState.details}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}
