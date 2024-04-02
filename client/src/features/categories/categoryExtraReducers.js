// Summary: This file contains the extra reducers for the category slice.

// Import Thunks
import { getCategories } from "./categoryThunks";

// Define the extra reducers for the category slice
export const categoryExtraReducers = (builder) => {
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
    });
};
