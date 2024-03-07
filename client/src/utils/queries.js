import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query getCategories {
    getCategories {
      _id
      name
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts {
    getProducts {
      _id
      name
      createdAt
      category {
        _id
        name
      }
      shortDescription
      details
      price
      quantity
      image {
        cloudinaryId
        url
      }
      isFeatured
      inStock
    }
  }
`;
