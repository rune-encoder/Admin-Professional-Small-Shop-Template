import { createSlice } from "@reduxjs/toolkit";

// Import extra reducers
import { productExtraReducers } from ".//productExtraReducers";

// Initial state for the products slice
const initialState = {
  currentProduct: null,
  productMode: null,
  products: [],
  getProductsStatus: "idle",
  getProductsError: null,
  // !WORKING: ===================================
  createProductStatus: "idle",
  createProductError: null,
  // !WORKING: ===================================
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
    setProductMode: (state, action) => {
      state.productMode = action.payload.mode;
      state.currentProduct = action.payload.product || null;
    },
  },
  extraReducers: (builder) => {
    productExtraReducers(builder);
  },
});

// Actions
export const { setProductMode } = productsSlice.actions;

// Reducer
export default productsSlice.reducer;
