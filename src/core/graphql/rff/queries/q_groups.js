
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const GROUPS = gql`
  query groups($token: String!) {
    groups(token: $token) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;