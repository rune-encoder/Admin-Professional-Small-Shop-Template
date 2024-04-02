import { createSlice } from "@reduxjs/toolkit";

// Import Thunks
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories/categoryThunks";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./products/productThunks";

// Initial state for the error slice
const initialState = {
  latestErrorMessage: null,
  showErrorModal: false,
};

// Helper function to handle rejected promises from async thunks
const handleRejected = (state, action) => {
  // Save the error message to the error state
  state.latestErrorMessage = action.error;
  // Show the error modal
  state.showErrorModal = true;
};

// Create a slice for the error state
const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    toggleErrorModal: (state, action) => {
      state.showErrorModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==============================
      // SET ERROR STATUS: CATEGORIES
      // ==============================
      .addCase(getCategories.rejected, handleRejected)
      .addCase(createCategory.rejected, handleRejected)
      .addCase(updateCategory.rejected, handleRejected)
      .addCase(deleteCategory.rejected, handleRejected)
      // ==============================
      // SET ERROR STATUS: PRODUCTS
      // ==============================
      .addCase(getProducts.rejected, handleRejected)
      .addCase(createProduct.rejected, handleRejected)
      .addCase(updateProduct.rejected, handleRejected)
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

// Actions
export const { updateErrorMessage, toggleErrorModal } = errorSlice.actions;

// Selectors
export const selectLatestErrorMessage = (state) =>
  state.error.latestErrorMessage;
export const selectShowErrorModal = (state) => state.error.showErrorModal;

// Reducer
export default errorSlice.reducer;
