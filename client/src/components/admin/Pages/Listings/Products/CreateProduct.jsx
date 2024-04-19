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

import { setProductMode } from "../../../../../features/products/productSlice";

// Import Redux Thunks
import { getCategories } from "../../../../../features/categories/categoryThunks";
import {
  getProducts,
  createProduct,
} from "../../../../../features/products/productThunks";

// Import Components
import { ImagePreview } from "../../../Pages/Listings/Products/ImagePreview";
import { ImagesCarousel } from "../../../Pages/Listings/Products/ImageCarousel";

// Import React Icons
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { BsSave } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export function CreateProduct() {
  // ==============================
  // Custom Hooks Section
  // ==============================
  const {
    selectedImages,
    displayImage,
    setDisplayImage,
    setSelectedImages,
    handleImageChange,
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
  const handleSubmit = async (event) => {
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

  // ! Revisit: Handling Loading State
  if (getCategoriesStatus === "loading") {
    return <div>Loading...</div>;
  }
  // ! ==========>

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
      <ImagePreview displayImage={displayImage} />

      {/* Product Images Carousel */}
      <ImagesCarousel
        selectedImages={selectedImages}
        setDisplayImage={setDisplayImage}
      />

      <section className="choose-file__container">
        <input
          className="choose-file__input"
          placeholder="Upload Image"
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          multiple
        />
      </section>

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

        <section className="control__item-row--grid-100">
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
                Create
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

          <div className="iew__item-cell">
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
