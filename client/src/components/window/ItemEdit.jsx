// Import React Hooks
import { useState, useEffect } from "react";

// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectCurrentProduct } from "../../features/products/productSelectors";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";

export default function ItemView() {
  const selectedProduct = useSelector(selectCurrentProduct);

  const [formState, setFormState] = useState({ ...selectedProduct });

  useEffect(() => {
    setFormState({ ...selectedProduct });
  }, [selectedProduct]);

  const handleInputChange = async (event) => {
    const { name, type, checked } = event.target;
    const value = type === "checkbox" ? checked : event.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
          <option>Test</option>
        </select>
      </div>

      <div className="custom-row--wrapper row-no-gutters">
        <div className="col-md-9 col-sm-5">
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

        <div className="col-md-3 col-sm-5">
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
