import { createSlice } from "@reduxjs/toolkit";

// Import extra reducers
import { categoryExtraReducers } from "./categoryExtraReducers";

// Initial state for the categories slice
const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

// Create the categories slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    categoryExtraReducers(builder);
  },
});

// Actions
// export const {} = categorySlice.actions;

// Reducer
export default categorySlice.reducer;
