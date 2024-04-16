// Import the apollo client
import { client } from "../../utils/apollo/apolloClient";

// Import Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Queries
import { QUERY_CATEGORIES } from "../../utils/graphql/queries";

// Import Mutations
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../../utils/graphql/mutations";

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

// Create a new category and add it to the server
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (name) => {
    const { data } = await client.mutate({
      mutation: CREATE_CATEGORY,
      variables: { name },

      // Update the Apollo cache with the new category
      update: (cache, { data: { createCategory } }) => {
        // Read the category data from the cache.
        const categoryData = cache.readQuery({ query: QUERY_CATEGORIES });

        // Add the new category to the cache
        if (categoryData) {
          cache.writeQuery({
            query: QUERY_CATEGORIES,
            data: {
              getCategories: [...categoryData.getCategories, createCategory],
            },
          });
        }
      },
    });

    return data?.createCategory || [];
  }
);

// Update an existing category on the server
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, name }) => {
    const { data } = await client.mutate({
      mutation: UPDATE_CATEGORY,
      variables: { id, name },
    });

    // Note: Apllo automatically updates the cache with the new category due to the cache normalization feature
    return data?.updateCategory || [];
  }
);

// Delete a category from the server
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    const { data } = await client.mutate({
      mutation: DELETE_CATEGORY,
      variables: { id },

      // Apollo update function: Manual changes to the Apollo cache
      update: (cache, { data }) => {
        // Get the Apollo cache id of the deleted product
        const productCacheId = cache.identify(data.deleteCategory);

        // Remove the deleted product from the Apollo cache
        cache.evict({ id: productCacheId });
      },
    });

    // Return the deleted category from the server
    return data?.deleteCategory || [];
  }
);
