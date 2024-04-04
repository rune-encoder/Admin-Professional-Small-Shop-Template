// Summary: This file contains the selectors for the categories slice of the Redux store.

// Selector for: Selecting the category of interest for (editing, deleting, etc.)
export const selectCurrentCategory = (state) => state.categories.currentCategory;

// Selectors for: Toggling the category edit mode (view, update, create, etc.)
export const selectCategoryMode = (state) => state.categories.categoryMode;

// Selector for: QUERY_CATEGORIES
export const selectGetCategories = (state) => state.categories.categories;
export const selectGetCategoriesStatus = (state) => state.categories.status;

// Selector for: CREATE_CATEGORY
export const selectCreateCategoryStatus = (state) => state.categories.createCategoryStatus;

// Selector for: UPDATE_CATEGORY
export const selectUpdateCategoryStatus = (state) => state.categories.updateCategoryStatus;

// Selector for: DELETE_CATEGORY
export const selectDeleteCategoryStatus = (state) => state.categories.deleteCategoryStatus;