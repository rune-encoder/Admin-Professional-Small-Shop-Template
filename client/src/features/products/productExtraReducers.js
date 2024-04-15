// Summary: This file contains the extra reducers for the product slice.

// Import Thunks
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productThunks";

// Define the extra reducers for the product slice
export const productExtraReducers = (builder) => {
  builder
    // ==============================
    // SET STATUS: GET PRODUCTS
    // ==============================
    .addCase(getProducts.pending, (state) => {
      state.getProductsStatus = "loading";
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.getProductsStatus = "succeeded";
      state.products = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.getProductsStatus = "failed";
      state.getProductsError = action.error.message;
    })
    // ==============================
    // SET STATUS: CREATE PRODUCT
    // ==============================
    .addCase(createProduct.pending, (state) => {
      state.createProductStatus = "loading";
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.createProductStatus = "succeeded";
      state.productMode = "view";
      state.currentProduct = action.payload;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.createProductStatus = "failed";
      state.createProductError = action.error.message;
    })
    // ==============================
    // SET STATUS: UPDATE PRODUCT
    // ==============================
    .addCase(updateProduct.pending, (state) => {
      state.updateProductStatus = "loading";
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.updateProductStatus = "succeeded";
      state.productMode = "view";
      state.currentProduct = action.payload;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.updateProductStatus = "failed";
      state.updateProductError = action.error.message;
    })
    // ==============================
    // SET STATUS: DELETE PRODUCT
    // ==============================
    .addCase(deleteProduct.pending, (state) => {
      state.deleteProductStatus = "loading";
    })
    .addCase(deleteProduct.fulfilled, (state) => {
      state.deleteProductStatus = "succeeded";
      state.currentProduct = null;
      state.productMode = null;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.deleteProductStatus = "failed";
      state.deleteProductError = action.error.message;
    });
};
