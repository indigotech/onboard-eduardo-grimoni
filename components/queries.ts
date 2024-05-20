import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Mutation($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const GET_USERS = gql`
  query Query {
    users {
      nodes {
        id
        name
        email
      }
    }
  }
`;
