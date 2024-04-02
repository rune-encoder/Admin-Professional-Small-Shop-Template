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

export const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      _id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $name: String!) {
    updateCategory(_id: $id, name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(_id: $id) {
      _id
      name
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
  mutation updateProduct($id: ID!, $input: ProductUpdateInput!) {
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
  mutation deleteProduct($id: ID!, $images: [ImageDeleteInput]) {
    deleteProduct(_id: $id, images: $images) {
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

export const CREATE_ADMIN = gql`
mutation adminCreate($username: String!, $email: String!, $password: String!, $permission: String!) {
  adminCreate(username: $username, email: $email, password: $password, permission: $permission) {
    _id
    email
    username
    permission
  }
}
`;
