
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const UPDATE_GROUP = gql`
  mutation updateGroup($token: String!, $id: String!, $title: String, $active: Boolean) {
    updateGroup(token: $token, id: $id, title: $title, active: $active) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;