// Import the apollo client
import { client } from "../../utils/apolloClient";

// Import Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Queries
import { QUERY_CATEGORIES } from "../../utils/queries";

// Import Mutations
import { UPDATE_CATEGORY } from "../../utils/mutations";

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

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, name }) => {
    const { data } = await client.mutate({
      mutation: UPDATE_CATEGORY,
      variables: { id, name },
    });

    return data?.updateCategory || [];
  }
);
