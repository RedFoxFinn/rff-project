
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const ME = gql`
  query me($token: String!) {
    me(token: $token) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;