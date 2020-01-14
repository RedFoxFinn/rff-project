
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const PRIVATE_LISTS = gql`
  query privateLists($token: String!) {
    privateLists(token: $token) {
      ...ListDetails
      owner {
        ...UserDetails
      }
    }
  }
  ${USER_DETAILS}
  ${LIST_DETAILS}
`;