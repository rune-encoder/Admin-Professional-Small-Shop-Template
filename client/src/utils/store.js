import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import themeReducer, { toggleTheme } from "../features/themeSlice/";

const listenerMiddleware = createListenerMiddleware();

// ! Revisit, seperate middleware from store
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

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    admin: adminReducer,
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
