// Import React Hooks
import { useState, useEffect, useRef } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Redux Selectors
import {
  selectGetCategories,
  selectGetCategoriesStatus,
} from "../../features/categories/categorySelectors";

import { selectCurrentProduct } from "../../features/products/productSelectors";

// Import Redux Thunks
import { getCategories } from "../../features/categories/categoryThunks";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../../features/products/productThunks";

// Import Components
import ImagePreview from "./ImagePreview";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";

export default function ItemCreate() {
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

  // !WORKING: ===================================
  const [selectedImages, setSelectedImages] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);

  // !WORKING: ===================================

  // ==============================
  // useSelector Hooks Section
  // ==============================
  // Selector for the current product
  // !Disabled
  // const selectedProduct = useSelector(selectCurrentProduct);

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

  // ==============================
  // Event Handlers Section
  // ==============================

  // !WORKING: ===================================
  const handleImageChange = async (e) => {
    // Create a new array from the files (or file) selected.
    const newFiles = Array.from(e.target.files);

    // Create a new promise for the images (or image) to be read.
    const newImages = newFiles.map((file) => {
      return new Promise((resolve, reject) => {
        // Create new instance of the file reader API
        const reader = new FileReader();

        // Event handler called when the read operation is completed.
        reader.onloadend = () => {
          resolve(reader.result);
        };

        // Event handler is called when an error occurs while reading the files (or file)
        // If there is an error, the promise is rejected.
        reader.onerror = reject;

        // Read the files (or file) and convert them to a data URL.
        reader.readAsDataURL(file);
      });
    });

    try {
      // Wait for all the images (or image) to settle.
      // If fulfilled, the array of data URLs is assigned to newDataUrls.
      const newDataUrls = await Promise.all(newImages);

      // Add the new data URLs to the state of selectedImages array.
      setSelectedImages((prevImages) => [...prevImages, ...newDataUrls]);

      // Set the displayed image to the first image file uploaded
      // Note: Noticable when multiple files are uploaded at once.
      setDisplayImage(newDataUrls[0]);
    } catch (error) {
      // If rejected, an error message is logged to the console.
      console.error("Error reading image files:", error);
    }
  };

  // !WORKING: ===================================

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

    // console.log(formState);
    // console.log(selectedImages);

    let input = { ...formState, image: selectedImages };
    // console.log( selectedImages )
    // console.log({ input })

    // !Uncomment to check on the server
    await dispatch(createProduct({ input }));

    dispatch(getProducts());

    setFormState({
      name: "",
      category: "",
      price: 0,
      quantity: 0,
      isFeatured: false,
      shortDescription: "",
      details: "",
    });

    setSelectedImages([]);
    setDisplayImage(null);

  };

  // ! Revisit: Handling Loading State
  if (getCategoriesStatus === "loading") {
    return <div>Loading...</div>;
  }
  // ! ==========>

  return (
    <div className="selected-item-details">
      <ImagePreview
        selectedImages={selectedImages}
        displayImage={displayImage}
        setDisplayImage={setDisplayImage}
        handleImageChange={handleImageChange}
      />

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
                  <option key={category._id} name={category.name} value={category._id}>
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
                  Create
                </button>
                {/* <button className="product-edit__btn" type="button">
                  <IoArrowBackCircleOutline />
                  Cancel
                </button>
                <button className="product-edit__btn" type="button">
                  <BsTrash />
                  Delete
                </button> */}
              </div>
            </div>
          </div>

          <div className="product-edit__description">
            <label className="">Description: </label>
            <textarea
              name="shortDescription"
              placeholder="Provide a brief description of the product..."
              value={formState.shortDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="product-edit__description">
            <label>Details:</label>
            <textarea
              name="details"
              placeholder="Provide a details about the product..."
              value={formState.details}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
