// Summary: This file contains the extra reducers for the category slice.

// Import Thunks
import { getCategories, updateCategory, deleteCategory } from "./categoryThunks";

// Define the extra reducers for the category slice
export const categoryExtraReducers = (builder) => {
  builder
    // ==============================
    // SET STATUS: GET CATEGORIES
    // ==============================
    .addCase(getCategories.pending, (state) => {
      state.getCategoriesStatus = "loading";
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.getCategoriesStatus = "succeeded";
      state.categories = action.payload;
    })
    .addCase(getCategories.rejected, (state) => {
      state.getCategoriesStatus = "failed";
    })
    // ==============================
    // SET STATUS: UPDATE PRODUCT
    // ==============================
    .addCase(updateCategory.pending, (state) => {
      state.updateCategoryStatus = "loading";
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.updateCategoryStatus = "succeeded";
      state.currentCategory = action.payload;
      state.categoryMode = "view";
    })
    .addCase(updateCategory.rejected, (state) => {
      state.updateCategoryStatus = "failed";
    })
    // ==============================
    // SET STATUS: DELETE PRODUCT
    // ==============================
    .addCase(deleteCategory.pending, (state) => {
      state.deleteCategoryStatus = "loading";
    })
    .addCase(deleteCategory.fulfilled, (state) => {
      state.deleteCategoryStatus = "succeeded";
      state.currentCategory = null;
    })
    .addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryStatus = "failed";
    });
};
