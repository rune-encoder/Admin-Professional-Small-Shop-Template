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
      isFeatured
      inStock
      price
      quantity
      shortDescription
      details
      image {
        cloudinaryId
        url
        _id
      }
    }
  }
`;

export const QUERY_ADMINS = gql`
query getAdminsByFilter($filters: AdminFilterInput) {
  getAdmins(filters: $filters) {
    _id
    username
    email
    permission
  }
}
`;
