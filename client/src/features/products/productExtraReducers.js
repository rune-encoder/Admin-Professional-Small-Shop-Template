// Summary: This file contains the extra reducers for the product slice.

// Import Thunks
import { getProducts, updateProduct } from "./productThunks";

// Define the extra reducers for the product slice
export const productExtraReducers = (builder) => {
  builder
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
    .addCase(updateProduct.pending, (state) => {
      state.updateProductStatus = "loading";
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.updateProductStatus = "succeeded";
      state.currentProduct = action.payload;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.updateProductStatus = "failed";
      state.updateProductError = action.error.message;
    })
};
