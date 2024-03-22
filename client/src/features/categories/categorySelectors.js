// Summary: This file contains the selectors for the categories slice of the Redux store.

// Selector for: QUERY_CATEGORIES
export const selectGetCategories = (state) => state.categories.categories;
export const selectGetCategoriesStatus = (state) => state.categories.status;
export const selectGetCategoriesError = (state) => state.categories.error;
