import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QUERY_PRODUCTS } from "../utils/queries";

import { client } from "../utils/apolloClient";

const getProducts = createAsyncThunk("products/getProducts", async () => {
  const { data } = await client.query({
    query: QUERY_PRODUCTS,
  });
  return data?.getProducts || [];
});

const initialState = {
  products: [],
  status: "idle",
  error: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
        state.selectedProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
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
  },
});

// Actions
export const { selectProduct } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

// Reducer
export default productsSlice.reducer;

// Thunks
export { getProducts };

