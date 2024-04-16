import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlice/";
import themeReducer, { toggleTheme } from "../features/themeSlice/";
import menuReducer from "../features/menuSlice";
import errorReducer from "../features/errorSlice";
import toolbarReducer from "../features/toolbarSlice";

import categoriesReducer from "../features/categories/categorySlice";
import productsReducer from "../features/products/productSlice";

const listenerMiddleware = createListenerMiddleware();

// ! Revisit | seperate middleware from store
// Add a listener for the "theme/toggleTheme" action
listenerMiddleware.startListening({
  actionCreator: toggleTheme,
  effect: (action, listenerApi) => {
    // Get the current state
    const state = listenerApi.getState();

    // Get the current theme
    const darkMode = state.theme.darkMode;

    // Update the theme
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    // Save the theme to localStorage for future visits
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  },
});

// Add a listener to log the latest error message from async thunks.
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.error.latestErrorMessage !==
      previousState.error.latestErrorMessage
    );
  },
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const error = state.error.latestErrorMessage;

    console.error(error);
  },
});

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    admin: adminReducer,
    menu: menuReducer,
    error: errorReducer,
    products: productsReducer,
    categories: categoriesReducer,
    toolbar: toolbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// ! Revisit | Refactor
function updateTheme() {
  const darkMode = store.getState().theme.darkMode;

  darkMode
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
}

// Call updateTheme immediately after the store is created
updateTheme();
