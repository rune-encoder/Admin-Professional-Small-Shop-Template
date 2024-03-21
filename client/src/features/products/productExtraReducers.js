// Summary: This file contains the extra reducers for the product slice.

// Import Thunks
import { getCategories, getProducts } from "./productThunks";

// Define the extra reducers for the product slice
export const productExtraReducers = (builder) => {
  builder
    .addCase(getCategories.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(getProducts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};
