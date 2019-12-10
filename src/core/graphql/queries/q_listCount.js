
import gql from 'graphql-tag';

export const LIST_COUNT = gql`
  query listCount($token: String!) {
    listCount(token: $token)
  }
`;