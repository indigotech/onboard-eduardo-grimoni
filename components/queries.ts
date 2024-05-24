import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Mutation($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const GET_USERS = gql`
  query Query($data: PageInput) {
    users(data: $data) {
      nodes {
        id
        name
        email
      }
      count
      pageInfo {
        offset
        limit
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export const GET_DETAILS = gql`
  query User($userId: ID) {
    user(id: $userId) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
