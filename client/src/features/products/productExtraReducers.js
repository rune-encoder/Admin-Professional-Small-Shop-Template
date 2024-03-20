// Summary: This file contains the extra reducers for the product slice.

// Import Thunks
import { getProducts } from "./productThunks";

// Define the extra reducers for the product slice
export const productExtraReducers = (builder) => {
  builder
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
