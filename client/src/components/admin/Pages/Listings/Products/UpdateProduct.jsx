// Import React Hooks
import { useEffect } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Custom Hooks
import { useImageHandler } from "../../../../../hooks/useImageHandler";
import { useFormState } from "../../../../../hooks/useFormState";

// Import Redux Selectors
import {
  selectGetCategories,
  selectGetCategoriesStatus,
} from "../../../../../features/categories/categorySelectors";

import {
  selectCurrentProduct,
  selectProductMode,
} from "../../../../../features/products/productSelectors";

// Import Redux Actions
import { setProductMode } from "../../../../../features/products/productSlice";

// Import Redux Thunks
import { getCategories } from "../../../../../features/categories/categoryThunks";
import {
  getProducts,
  updateProduct,
} from "../../../../../features/products/productThunks";

// Import Components
import { ImagePreview } from "../../../Pages/Listings/Products/ImagePreview";
import { ImagesCarousel } from "../../../Pages/Listings/Products/ImageCarousel";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export function UpdateProduct() {
  // ==============================
  // Custom Hooks Section
  // ==============================
  const {
    selectedImages,
    displayImage,
    setDisplayImage,
    setSelectedImages,
    // handleImageChange,
  } = useImageHandler();

  const { formState, setFormState, handleInputChange } = useFormState({
    // Initialize formState with empty values
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
        }
      };

      // Trigger the file input to open the file selection dialog.
      fileInput.click();
    } catch (error) {
      console.error("Error updating image:", error);
    }
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

  return (
    <div className="control-item">
      {/* Back Button */}
      <button className="control__back-btn">
        <IoArrowBack
          onClick={() =>
            dispatch(setProductMode({ mode: null, product: null }))
          }
        />
      </button>

      {/* Primary Product Image */}
      <ImagePreview
        displayImage={displayImage}
        selectedProduct={selectedProduct}
      />

      {/* Product Images Carousel */}
      <ImagesCarousel
        selectedImages={selectedImages}
        setDisplayImage={setDisplayImage}
        handleImageUpdate={handleImageUpdate}
      />

      {/* Product Data */}
      <form className="control__item-details" onSubmit={handleSubmit}>
        <section className="control__item-row--flex-row-space">
          <label className="control__item-label">
            <MdOutlineShoppingCart /> Product:
          </label>

          <input
            className="control__item-value"
            type="text"
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={handleInputChange}
          />
        </section>

        <section className="control__item-row--flex-row-space">
          <label className="control__item-label">
            <MdOutlineCategory /> Category:
          </label>

          <select
            className="control__item-value"
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
        </section>

        <section className="control__item-row--gri-100">
          <div className="control__item-cell">
            <div className="control__item-group">
              <label className="control__item-label">Price:</label>
              <input
                className="control__item-value"
                type="number"
                name="price"
                value={formState.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="control__item-group">
              <label className="control__item-label">Quantity:</label>
              <input
                className="control__item-value"
                type="number"
                name="quantity"
                value={formState.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="control__item-group">
              <label className="control__item-label">Featured:</label>
              <input
                className="control__item-value"
                type="checkbox"
                name="isFeatured"
                checked={formState.isFeatured}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="control__item-cell">
            <div className="control__item-group">
              <button className="" type="submit">
                <BsSave />
                Save
              </button>
            </div>

            <div className="control__item-group">
              <button className="" type="button">
                <IoArrowBackCircleOutline />
                Cancel
              </button>
            </div>

            <div className="control__item-group">
              <button className="" type="button">
                <BsTrash />
                Delete
              </button>
            </div>
          </div>
        </section>

        <section className="control__item-row--grid">
          <div className="control__item-cell">
            <label className="control__item-label">Description:</label>
            <textarea
              className="control__item-value"
              name="shortDescription"
              placeholder="Provide a brief description of the product..."
              value={formState.shortDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="control__item-cell">
            <label className="control__item-label">Details:</label>
            <textarea
              className="control__item-value"
              name="details"
              placeholder="Provide a details about the product..."
              value={formState.details}
              onChange={handleInputChange}
            />
          </div>
        </section>
      </form>
    </div>
  );
}
