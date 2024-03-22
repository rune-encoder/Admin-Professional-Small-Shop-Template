// Import the apollo client
import { client } from "../../utils/apolloClient";

// Import Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Queries
import { QUERY_PRODUCTS } from "../../utils/queries";

// Import Mutations
import { UPDATE_PRODUCT } from "../../utils/mutations";

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
    });

    // Return the updated product from the server
    return data?.updateProduct;
  }
);
