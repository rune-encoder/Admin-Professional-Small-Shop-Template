import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayMenu: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // toggleMenuItem: (state, action) => {
    //     const [key, value] = Object.entries(action.payload)[0];
    //     state[key] = value;
    // },
    changeMenuDisplay: (state, action) => {
      state.displayMenu = action.payload;
    },
  },
});

// Actions
export const { changeMenuDisplay } = menuSlice.actions;

// Selectors
export const selectDisplayMenu = (state) => state.menu.displayMenu;

// Reducer
export default menuSlice.reducer;
