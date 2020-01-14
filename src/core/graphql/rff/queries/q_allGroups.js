
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const ALL_GROUPS = gql`
  query allGroups($token: String!) {
    allGroups(token: $token) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;