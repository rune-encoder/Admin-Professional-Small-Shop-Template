// Import the apollo client
import { client } from "../../utils/apolloClient";

// Import Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Queries
import { QUERY_CATEGORIES } from "../../utils/queries";

// Fetch all categories from the server
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const { data } = await client.query({
      query: QUERY_CATEGORIES,
    });

    // Return the categories from the server or an empty array
    return data?.getCategories || [];
  }
);
