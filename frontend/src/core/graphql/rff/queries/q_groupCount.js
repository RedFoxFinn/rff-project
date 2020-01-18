
import gql from 'graphql-tag';

export const GROUP_COUNT = gql`
  query groupCount($token: String!) {
    groupCount(token: $token)
  }
`;