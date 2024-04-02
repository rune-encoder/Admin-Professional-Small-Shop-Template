import { createSlice } from "@reduxjs/toolkit";

import Auth from "../utils/auth";

// Initial state
const initialState = {
  // !Revisit: Security Risk?
  adminData: Auth.loggedIn() ? Auth.getProfile().authenticatedAdmin : false,
};

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
  },
});

// Actions
export const { setAdminData } = adminSlice.actions;

// Selectors
export const selectAdmin = (state) => state.admin.adminData;

// Reducer
export default adminSlice.reducer;
