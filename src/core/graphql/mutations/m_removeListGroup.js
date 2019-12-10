
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';

export const REMOVE_LIST_GROUP = gql`
  mutation removeListGroup($token: String!, $id: String!) {
    removeListGroup(token: $token, id: $id) {
      ...ListDetails
    }
  }
  ${LIST_DETAILS}
`;