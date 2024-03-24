// Import the apollo client
import { client } from "../../utils/apolloClient";

// Import Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Queries
import { QUERY_PRODUCTS } from "../../utils/queries";

// Import Mutations
import { UPDATE_PRODUCT, DELETE_PRODUCT } from "../../utils/mutations";

// Fetch all products from the server
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const { data } = await client.query({
      query: QUERY_PRODUCTS,
    });

    // Return the products from the server or an empty array
    return data?.getProducts || [];
  }
);

// Update a product on the server
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, input }) => {
    const { data } = await client.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { id, input },

        //Note: Apollo automatically updates the cache with the new product due to normalization.
    });

    // Return the updated product from the server
    return data?.updateProduct;
  }
);

// Delete a product on the server
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const { data } = await client.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id },

      // Apollo update function: Manual changes to the Apollo cache
      update: (cache, { data }) => {
        // Get the Apollo cache id of the deleted product
        const productCacheId = cache.identify(data.deleteProduct);

        // Remove the deleted product from the Apollo cache
        cache.evict({ id: productCacheId });
      },
    });

    // Return the deleted product from the server
    return data?.deleteProduct;
  }
);
