
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const ACTIVATE_USER = gql`
  mutation activateUser($token: String!, $id: String!) {
    activateUser(token: $token, id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;