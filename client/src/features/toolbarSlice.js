import { createSlice } from "@reduxjs/toolkit";

// Initial state for the toolbar slice
const initialState = {
  searchTerm: "",
  sortType: 'none', 
};

// Create the toolbar slice
const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

// Actions
export const { setSearchTerm, setSortType } = toolbarSlice.actions;

// Selectors
export const selectSearchTerm = (state) => state.toolbar.searchTerm;
export const selectSortType = (state) => state.toolbar.sortType;

// Reducer
export default toolbarSlice.reducer;
