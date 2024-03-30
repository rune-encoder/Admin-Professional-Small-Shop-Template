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

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      name
      createdAt
      category {
        _id
      }
      inStock
      isFeatured
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

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(_id: $id, input: $input) {
      _id
      name
      createdAt
      category {
        _id
      }
      inStock
      isFeatured
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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(_id: $id) {
      _id
      name
      createdAt
      category {
        _id
      }
      inStock
      isFeatured
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
