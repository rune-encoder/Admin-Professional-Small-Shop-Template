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

// Import Components
import ImagePreview from "./ImagePreview";

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

  // !WORKING: ===================================
  // Initialize selectedImages with an empty array. This will hold the data URLs of the images uploaded.
  const [selectedImages, setSelectedImages] = useState([]);
  // Initialize displayImage with null. This will hold the data URL of the image displayed.
  const [displayImage, setDisplayImage] = useState(null);

  const [uploading, setUploading] = useState(false);
  // !WORKING: ===================================

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

  // !WORKING: ===================================
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImages(selectedProduct.image);
      setDisplayImage(selectedProduct.image[0]);
    }
  }, [selectedProduct]);

  // useEffect(() => {
  //   console.log("selectedImages:", selectedImages);
  //   console.log(typeof selectedImages);
  //   console.log("displayImage:", displayImage);
  // }, [selectedImages, displayImage]);
  // !WORKING: ===================================

  useEffect(() => {
    // ! Revisit: Ideally find a way to merge this with other components
    // Populate the form with the selected product's data if in update mode
    if (selectedProduct && productMode === "update") {
      setFormState({
        name: selectedProduct.name,
        category: selectedProduct.category ? selectedProduct.category._id : "",
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

  const handleImageUpdate = async (index) => {
    try {
      // Create a new input element of type file.
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.name = "image";
      fileInput.accept = "image/*";

      // If a file is selected, trigger the onchange event.
      fileInput.onchange = async (e) => {
        // Obtain the new selected file.
        const file = e.target.files[0];

        if (file) {
          setUploading(true);

          // Create a new promise for the image to be read.
          const newDataUrl = await new Promise((resolve, reject) => {
            // Create a new instance of the file reader API
            const reader = new FileReader();

            // Event handler called when the read operation is completed.
            reader.onloadend = () => resolve(reader.result);

            // Event handler is called when an error occurs while reading the file
            // If there is an error, the promise is rejected.
            reader.onerror = reject;

            // Read the file and convert it to a data URL.
            reader.readAsDataURL(file);
          });

          // Update the selected image with the new data URL.
          // Nest the new data URL in the selectedImages array at the index of the selected image.
          setSelectedImages((prevImages) =>
            // Map throught the previous images array
            prevImages.map((img, i) => {
              if (i === index) {
                // If the current image is the selected image, update the object to include the new data URL.
                const updatedImage = { ...img, dataURL: newDataUrl };

                // If the updated image is the currently displayed image, update displayImage as well.
                if (displayImage === img) {
                  setDisplayImage(updatedImage);
                }

                // Return the updated image object so it replaces the intended image object in the selectedImages array.
                return updatedImage;
              } else {
                return img;
              }
            })
          );

          setUploading(false);
        }
      };

      // Trigger the file input to open the file selection dialog.
      fileInput.click();
    } catch (error) {
      console.error("Error updating image:", error);
      setUploading(false);
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

    // Remove the __typename property from the selected images array
    // __typename is removed from images so the input will match the server's expected input.
    const imageData = selectedImages.map(({ __typename, ...image }) => image);

    // Create a new object with the form state and the selected images.
    // This object will match the input object expected by the server.
    let input = { ...formState, image: imageData };

    // Wait for the product to be updated before fetching the products again.
    await dispatch(updateProduct({ id: selectedProduct._id, input }));

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
      <ImagePreview
        selectedImages={selectedImages}
        displayImage={displayImage}
        setDisplayImage={setDisplayImage}
        handleImageChange={handleImageChange}
        handleImageUpdate={handleImageUpdate}
      />

      {/* <section className="item-details__top-section">
        <img
          className="item__image"
          src="https://justclickhere.co.uk/wp-content/uploads/2021/06/photo-editing.png"
        ></img>
      </section> */}

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
                  className="view__item-value"
                    type="number"
                    name="price"
                    value={formState.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="product-edit__label-group">
                  <label className="item-label">Quantity:</label>
                  <input
                                    className="view__item-value"
                    type="number"
                    name="quantity"
                    value={formState.quantity}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="product-edit__label-group">
                  <label className="item-label">Featured:</label>

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
            className="view__item-value"
              name="shortDescription"
              placeholder="Provide a brief description of the product..."
              value={formState.shortDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="product-edit__description">
            <label>Details:</label>
            <textarea
            className="view__item-value"
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
