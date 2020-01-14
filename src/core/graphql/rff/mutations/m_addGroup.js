
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const ADD_GROUP = gql`
  mutation addGroup($token: String!, $title: String!) {
    addGroup(token: $token, title: $title) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;