import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(localStorage.getItem("darkMode"));
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialState = {
    darkMode: savedTheme !== null ? savedTheme : systemTheme,
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export const selectDarkMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;