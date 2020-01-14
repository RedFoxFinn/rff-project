
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const REMOVE_LIST_PRIVATE = gql`
  mutation removeListPrivate($token: String!, $id: String!) {
    removeListPrivate(token: $token, id: $id) {
      ...ListDetails
      owner {
        ...UserDetails
      }
    }
  }
  ${USER_DETAILS}
  ${LIST_DETAILS}
`;