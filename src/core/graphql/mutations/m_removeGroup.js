
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const UPDATE_GROUP = gql`
  mutation updateGroup($token: String!, $id: String!) {
    updateGroup(token: $token, id: $id) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;