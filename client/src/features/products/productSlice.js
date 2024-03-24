import { createSlice } from "@reduxjs/toolkit";

// Import extra reducers
import { productExtraReducers } from ".//productExtraReducers";

// Initial state for the products slice
const initialState = {
  currentProduct: null,
  productEditMode: false,
  products: [],
  getProductsStatus: "idle",
  getProductsError: null,
  updateProductStatus: "idle",
  updateProductError: null,
  deleteProductStatus: "idle",
  deleteProductError: null,
};

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ! Rename due to confusion with selector
    currentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    toggleProductEditMode: (state, action) => {
      state.productEditMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    productExtraReducers(builder);
  },
});

// Actions
export const { currentProduct, toggleProductEditMode } =
  productsSlice.actions;

// Reducer
export default productsSlice.reducer;

