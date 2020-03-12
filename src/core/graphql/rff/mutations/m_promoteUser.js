
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const PROMOTE_USER = gql`
  mutation promoteUser($token: String!, $id: String!) {
    promoteUser(token: $token, id: $id) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;