
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const USER_ADDED = gql`
  subscription {
    userAdded {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;