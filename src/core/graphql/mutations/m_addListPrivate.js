
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {USER_DETAILS} from '../fragments/f_userFragment';

export const ADD_LIST_PRIVATE = gql`
  mutation addListPrivate($token: String!, $title: String!) {
    addListPrivate(token: $token, title: $title) {
      ...ListDetails
      owner {
        ...UserDetails
      }
    }
  }
  ${USER_DETAILS}
  ${LIST_DETAILS}
`;