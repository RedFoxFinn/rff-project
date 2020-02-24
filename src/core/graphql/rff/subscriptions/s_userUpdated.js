
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const USER_UPDATED = gql`
  subscription {
    userUpdated {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;