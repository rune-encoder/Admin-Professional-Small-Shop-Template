import { gql } from '@apollo/client';

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
