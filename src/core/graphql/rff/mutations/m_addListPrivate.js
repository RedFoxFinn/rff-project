
import gql from 'graphql-tag';
import {PRIVATE_LIST_DETAILS} from '../fragments/f_privateListFragment';

export const ADD_LIST_PRIVATE = gql`
  mutation addListPrivate($token: String!, $title: String!) {
    addListPrivate(token: $token, title: $title) {
      ...PrivateListDetails
    }
  }
  ${PRIVATE_LIST_DETAILS}
`;