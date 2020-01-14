
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;