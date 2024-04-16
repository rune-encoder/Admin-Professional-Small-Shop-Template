import { createSlice } from "@reduxjs/toolkit";

// Initial state for the toolbar slice
const initialState = {
  searchTerm: "",
  sortType: 'none',
  listType: "products",
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
    setListType: (state, action) => {
      state.listType = action.payload.mode;
    },
  },
});

// Actions
export const { setSearchTerm, setSortType, setListType } = toolbarSlice.actions;

// Selectors
export const selectSearchTerm = (state) => state.toolbar.searchTerm;
export const selectSortType = (state) => state.toolbar.sortType;
export const selectListType = (state) => state.toolbar.listType;

// Reducer
export default toolbarSlice.reducer;
