
import gql from 'graphql-tag';

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    role
    id
  }
`;