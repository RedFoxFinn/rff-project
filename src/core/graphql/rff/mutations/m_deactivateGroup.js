
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const DEACTIVATE_GROUP = gql`
  mutation deactivateGroup($token: String!, $id: String!) {
    deactivateGroup(token: $token, id: $id) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;