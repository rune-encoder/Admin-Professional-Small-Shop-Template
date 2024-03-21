import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password) {
      token
      admin {
        _id
        username
        permission
        email
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(_id: $id, input: $input) {
      _id
      category {
        _id
      }
      createdAt
      details
      image {
        cloudinaryId
        url
      }
      inStock
      isFeatured
      name
      price
      quantity
      shortDescription
    }
  }
`;
