import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: false,
  categories: false,
  products: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenuItem: (state, action) => {
        const [key, value] = Object.entries(action.payload)[0];
        state[key] = value;
    },
    closeMenuItem: (state, action) => {
      state[action.payload] = false;
    },
  },
});

// Actions
export const { openMenuItem, closeMenuItem } = menuSlice.actions;

// Selectors
export const selectMenu = (state) => state.menu;
export const selectStore = (state) => state.menu.store;
export const selectCategories = (state) => state.menu.categories;
export const selectProducts = (state) => state.menu.products;

// Reducer
export default menuSlice.reducer;
