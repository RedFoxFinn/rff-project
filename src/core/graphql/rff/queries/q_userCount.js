
import gql from 'graphql-tag';

export const USER_COUNT = gql`
  query userCount($token: String!) {
    userCount(token: $token)
  }
`;