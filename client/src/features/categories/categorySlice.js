import { createSlice } from "@reduxjs/toolkit";

// Import extra reducers
import { categoryExtraReducers } from "./categoryExtraReducers";

// Initial state for the categories slice
const initialState = {
  currentCategory: null,
  categoryMode: null,
  categories: [],
  status: "idle",
};

// Create the categories slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoryMode: (state, action) => {
      state.categoryMode = action.payload.mode;
      state.currentCategory = action.payload.category || null;
    },
  },
  extraReducers: (builder) => {
    categoryExtraReducers(builder);
  },
});

// Actions
export const { setCategoryMode } = categorySlice.actions;

// Reducer
export default categorySlice.reducer;
