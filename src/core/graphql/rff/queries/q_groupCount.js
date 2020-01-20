
import gql from 'graphql-tag';

export const GROUP_COUNT = gql`
  query groupCount($token: String!, $mode: String) {
    groupCount(token: $token, mode: $mode)
  }
`;