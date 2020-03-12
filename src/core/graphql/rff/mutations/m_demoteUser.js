
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const DEMOTE_USER = gql`
  mutation demoteUser($token: String!, $id: String!) {
    demoteUser(token: $token, id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;