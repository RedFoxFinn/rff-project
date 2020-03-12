
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const ACTIVATE_GROUP = gql`
  mutation activateGroup($token: String!, $id: String!) {
    activateGroup(token: $token, id: $id) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;