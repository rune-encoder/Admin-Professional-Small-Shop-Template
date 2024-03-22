// Summary: This file contains the selectors for the products slice of the Redux store.

// Selector for: Selecting the product of interest for (editing, deleting, etc.)
export const selectCurrentProduct = (state) => state.products.currentProduct;

// Selectors for: Toggling the product edit mode (true/false)
export const selectProductEditMode = (state) =>
  state.products.productEditMode;

// Selectors for: QUERY_PRODUCTS
export const selectGetProducts = (state) => state.products.products;
export const selectGetProductsStatus = (state) => state.products.status;
export const selectGetProductsError = (state) => state.products.error;

// Selectors for: UPDATE_PRODUCT
export const selectUpdateProduct = (state) => state.products.currentProduct;
export const selectUpdateProductStatus = (state) => state.products.status;
export const selectUpdateProductError = (state) => state.products.error;
