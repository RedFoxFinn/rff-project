
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const LIST_EVENT_PRIVATE = gql`
  subscription {
    listEventPrivate {
      ...ListDetails
      owner {
        ...UserDetails
      }
    }
  }
  ${USER_DETAILS}
  ${LIST_DETAILS}
`;