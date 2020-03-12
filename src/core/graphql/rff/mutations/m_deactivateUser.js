
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const DEACTIVATE_USER = gql`
  mutation deactivateUser($token: String!, $id: String!) {
    deactivateUser(token: $token, id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;