// ! Revisit: Add useCallback

// Summary: This component is responsible for rendering the product control form.
// The form is used to create or update a product.
// It uses the ImagePreview and ImagesCarousel components to display the product images.

// Import React Hooks
import { useEffect } from "react";

// Import Redux Hooks
import { useSelector, useDispatch } from "react-redux";

// Import Custom Hooks
import { useImageHandler, useFormState } from "./hooks";

// Import Redux Selectors
import {
  selectGetCategories,
  selectGetCategoriesStatus,
} from "../../../../../../features/categories/categorySelectors";

import {
  selectCurrentProduct,
  selectProductMode,
} from "../../../../../../features/products/productSelectors";

// Import Redux Actions
import { setProductMode } from "../../../../../../features/products/productSlice";

// Import Redux Thunks
import { getCategories } from "../../../../../../features/categories/categoryThunks";
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../../../../../../features/products/productThunks";

// Import Components
import { ImagePreview, ImagesCarousel } from "./index";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { BsSave } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export function ProductControl() {
  // ==============================
  // Custom Hooks Section
  // ==============================
  const {
    selectedImages,
    displayImage,
    setDisplayImage,
    setSelectedImages,
    handleImageFileChange,
    handleImageUpdate,
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
    dispatch(getCategories());
  }, [dispatch]);

  // Effect for handling if the product is selected
  // If a product is selected, set the selected images and display the first image.
  // If no product is selected, reset the selected images and display image.
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImages(selectedProduct.image);
      setDisplayImage(selectedProduct.image[0]);
    } else {
      setSelectedImages([]);
      setDisplayImage(null);
    }
  }, [selectedProduct]);

  // Effect for handling if the product is selected and the product mode is "update"
  useEffect(() => {
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
  }, [selectedProduct]);

  // Handles form submission for creating a new product
  const handleCreateSubmit = async (event) => {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Create a new object with the form state and the selected images.
    let input = { ...formState, image: selectedImages };

    // Wait for the product to be created before fetching the products again.
    await dispatch(createProduct({ input }));

    // Refresh the products list global state by fetching the products again. (Server or Cache)
    dispatch(getProducts());

    // Reset the form state after the form is submitted.
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

  // Handles form submission for updating an existing product
  const handleUpdateSubmit = async (event) => {
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

  // Loading State
  if (getCategoriesStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="control-item">
      {/* Back Button */}
      <button className="control__btn-back">
        <IoArrowBack
          onClick={() =>
            dispatch(setProductMode({ mode: null, product: null }))
          }
        />
      </button>

      {selectedImages.length > 0 && (
        <>
          {/* Primary Product Image */}
          <ImagePreview
            displayImage={displayImage}
            selectedProduct={selectedProduct}
          />

          {/* Product Images Carousel */}
          <ImagesCarousel
            selectedImages={selectedImages}
            setDisplayImage={setDisplayImage}
            handleImageUpdate={
              productMode === "update" ? handleImageUpdate : undefined
            }
          />
        </>
      )}

      {/* Product Form */}
      <form
        className="control__item-details"
        onSubmit={
          productMode === "update" ? handleUpdateSubmit : handleCreateSubmit
        }
      >
        {/* Choose Image File Input */}
        {productMode === "create" && (
          <section className="control__item-row--flex-row-end">
            <input
              className="choose-file__input"
              placeholder="Upload Image"
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageFileChange}
              multiple
            />
          </section>
        )}

        <section className="control__item-row--grid">
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

        <section className="control__item-row--grid">
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

        <section className="control__item-row--flex-col">
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
        </section>

        <section className="control__item-row--column">
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

        <section className="control__item-row--flex-col">
          <button className="control__btn-action" type="submit">
            <BsSave />
            {productMode === "update" ? "Save" : "Create"}
          </button>
        </section>
      </form>
    </div>
  );
}
