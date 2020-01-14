
import gql from 'graphql-tag';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const USER_EVENT = gql`
  subscription {
    userEvent {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;