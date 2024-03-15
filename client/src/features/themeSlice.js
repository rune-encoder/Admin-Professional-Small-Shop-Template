import { createSlice } from "@reduxjs/toolkit";

// Theme: Get the system perferred theme.
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Theme: If the user has visited before, get the saved theme from localStorage.
const savedTheme = JSON.parse(localStorage.getItem("darkMode"));

// Initial state
const initialState = {
  darkMode: savedTheme !== null ? savedTheme : systemTheme,
};

// Slice
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Actions
export const { toggleTheme } = themeSlice.actions;

// Selectors
export const selectIsDarkModeEnabled = (state) => state.theme.darkMode;

// Reducer
export default themeSlice.reducer;
