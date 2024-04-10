// Summary: This file contains the extra reducers for the category slice.

// Import Thunks
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoryThunks";

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
    // SET STATUS: CREATE CATEGORY
    // ==============================
    .addCase(createCategory.pending, (state) => {
      state.createCategoryStatus = "loading";
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.createCategoryStatus = "succeeded";
      state.categoryMode = "view";
      state.currentCategory = action.payload;
    })
    .addCase(createCategory.rejected, (state) => {
      state.createCategoryStatus = "failed";
    })
    // ==============================
    // SET STATUS: UPDATE CATEGORY
    // ==============================
    .addCase(updateCategory.pending, (state) => {
      state.updateCategoryStatus = "loading";
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.updateCategoryStatus = "succeeded";
      state.categoryMode = "view";
      state.currentCategory = action.payload;
    })
    .addCase(updateCategory.rejected, (state) => {
      state.updateCategoryStatus = "failed";
    })
    // ==============================
    // SET STATUS: DELETE CATEGORY
    // ==============================
    .addCase(deleteCategory.pending, (state) => {
      state.deleteCategoryStatus = "loading";
    })
    .addCase(deleteCategory.fulfilled, (state) => {
      state.deleteCategoryStatus = "succeeded";
      state.categoryMode = null;
      state.currentCategory = null;
    })
    .addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryStatus = "failed";
    });
};
