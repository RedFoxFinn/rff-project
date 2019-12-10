
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const REMOVE_USER = gql`
  mutation removeUser($token: String!, $id: String!) {
    removeUser(token: $token, id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;