
import gql from 'graphql-tag';

export const ALL_LIST_COUNT = gql`
  query allListCount($token: String!) {
    allListCount(token: $token)
  }
`;