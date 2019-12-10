
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const UPDATE_USER = gql`
  mutation updateUser($token: String!, $newUsername: String!, $newPassword: String!) {
    updateUser(newUsername: $newUsername, newPassword: $newPassword) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;