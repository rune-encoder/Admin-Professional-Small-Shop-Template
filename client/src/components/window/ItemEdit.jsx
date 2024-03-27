// Import React Hooks
import { useState, useEffect, useRef } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetCategories,
  selectGetCategoriesStatus,
} from "../../features/categories/categorySelectors";

import {
  selectCurrentProduct,
  selectProductMode,
} from "../../features/products/productSelectors";

// Import Redux Thunks
import { getCategories } from "../../features/categories/categoryThunks";
import {
  getProducts,
  updateProduct,
} from "../../features/products/productThunks";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";

export default function ItemEdit() {
  // !Delete: Used to check re-renders of the component
  // const renderCount = useRef(0);

  // useEffect(() => {
  //   renderCount.current = renderCount.current + 1;
  //   console.log(`ItemEdit has rendered ${renderCount.current} times`);
  // });
  // ! ==========>

  // ==============================
  // useState Hooks Section
  // ==============================
  // Initialize formState with empty values
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    isFeatured: false,
    shortDescription: "",
    details: "",
  });

  // ==============================
  // useSelector Hooks Section
  // ==============================
  // Selector for the current product
  const selectedProduct = useSelector(selectCurrentProduct);

  // Selector for product mode: "view", "update", "new"
  const productMode = useSelector(selectProductMode);

  // Selector for the categories
  const categories = useSelector(selectGetCategories);
  const getCategoriesStatus = useSelector(selectGetCategoriesStatus);

  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEffect Hooks Section
  // ==============================
  useEffect(() => {
    // Fetch the categories for the select dropdown when the component mounts
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    // ! Revisit: Ideally find a way to merge this with other components
    // Populate the form with the selected product's data if in update mode
    if (selectedProduct && productMode === "update") {
      setFormState({
        name: selectedProduct.name,
        category: selectedProduct.category._id,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
        isFeatured: selectedProduct.isFeatured,
        shortDescription: selectedProduct.shortDescription,
        details: selectedProduct.details,
      });
    } 
  }, [selectedProduct, productMode]);

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    let newValue;

    if (type === "checkbox") {
      // Checkbox values are boolean
      newValue = checked;
    } else if (name === "price") {
      // Round the price to 2 decimal places
      newValue = parseFloat(parseFloat(value).toFixed(2));
    } else if (name === "quantity") {
      // Whole numbers only
      newValue = parseInt(value, 10);
    } else {
      newValue = value;
    }

    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event) => {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Wait for the product to be updated before fetching the products again.
    await dispatch(
      updateProduct({ id: selectedProduct._id, input: formState })
    );

    // Refresh the products list global state by fetching the products again. (Server or Cache)
    dispatch(getProducts());
  };

  // ! Revisit: Handling Loading State
  if (getCategoriesStatus === "loading") {
    return <div>Loading...</div>;
  }
  // ! ==========>

  return (
      <div className="selected-item-details">
        <section className="item-details__top-section">
          <img
            className="item__image"
            src="https://justclickhere.co.uk/wp-content/uploads/2021/06/photo-editing.png"
          ></img>
        </section>

        <section className="item-details__bottom-section">
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
        </section>
      </div>
  );
}
