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
    toggleMenuItem: (state, action) => {
        const [key, value] = Object.entries(action.payload)[0];
        state[key] = value;
    },
  },
});

// Actions
export const { toggleMenuItem } = menuSlice.actions;

// Selectors
export const selectMenu = (state) => state.menu;

// Reducer
export default menuSlice.reducer;
