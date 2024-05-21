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