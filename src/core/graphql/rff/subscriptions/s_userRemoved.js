
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const USER_REMOVED = gql`
  subscription {
    userRemoved {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;