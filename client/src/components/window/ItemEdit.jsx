// Import React Hooks
import { useState, useEffect } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectCurrentProduct,
  selectGetCategories,
  selectGetCategoriesStatus,
  selectGetCategoriesError,
} from "../../features/products/productSelectors";

// Import Redux Thunks
import { getCategories } from "../../features/products/productThunks";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";

export default function ItemView() {
  // useState Hooks
  // Initialize formState with an empty object
  const [formState, setFormState] = useState({
    name: "",
    price: 0,
    quantity: 0,
    isFeatured: false,
    shortDescription: "",
    details: "",
  });

  // useSelector Hooks
  const selectedProduct = useSelector(selectCurrentProduct);
  const categories = useSelector(selectGetCategories);
  const categoriesStatus = useSelector(selectGetCategoriesStatus);
  const categoriesError = useSelector(selectGetCategoriesError);

  // useDispatch Hooks
  const dispatch = useDispatch();

  // useEffect Hooks
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setFormState({ ...selectedProduct });
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

  if (categoriesStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (categoriesStatus === "failed") {
    console.error(categoriesError);
    return <div>Error</div>;
  }

  return (
    <form className="product-edit__form">
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
        <select>
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
            <button className="product-edit__btn" type="button">
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
