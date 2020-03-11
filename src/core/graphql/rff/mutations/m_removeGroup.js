
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const REMOVE_GROUP = gql`
  mutation removeGroup($token: String!, $id: String!) {
    removeGroup(token: $token, id: $id) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;