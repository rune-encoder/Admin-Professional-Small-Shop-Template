// Import the apollo client
import { client } from "../../utils/apolloClient";

// Import Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Queries
import { QUERY_PRODUCTS } from "../../utils/queries";
import { QUERY_CATEGORIES } from "../../utils/queries";

// Import Mutations
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../utils/mutations";

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

// Create a new product and add it to the server
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (input) => {
    const { data } = await client.mutate({
      mutation: CREATE_PRODUCT,
      variables: input,

      // Update the Apollo cache with the new product
      update: (cache, { data: { createProduct } }) => {
        // Read the category data from the cache.
        const categoryData = cache.readQuery({ query: QUERY_CATEGORIES });
        // Find the category object that matches the new product's category id.
        const category = categoryData?.getCategories.find(
          (category) => category._id === createProduct.category._id
        );

        // Read the products data from the cache.
        const productData = cache.readQuery({ query: QUERY_PRODUCTS });

        // Create a new product object that includes the category name.
        // Note: This is needed to match the structure of the getProducts query and update the cache.
        // Creating a new object avoids unintended side effects when updating the cache.
        const newCreateProduct = {
          ...createProduct,
          category: {
            ...createProduct.category,
            name: category?.name,
          },
        };

        // Add the new product to the cache.
        if (productData) {
          cache.writeQuery({
            query: QUERY_PRODUCTS,
            data: {
              getProducts: [...productData.getProducts, newCreateProduct],
            },
          });
        }
      },
    });

    // Return the new product from the server
    return data?.createProduct;
  }
);

// Update a product on the server
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, input }) => {
    console.log({ id, input })
    
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
