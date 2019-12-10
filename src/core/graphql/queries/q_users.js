
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const USERS = gql`
  query users($token: String!, $active: Boolean, $username: String, $role: String) {
    users(token: $token, active: $active, username: $username, role: $role) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;