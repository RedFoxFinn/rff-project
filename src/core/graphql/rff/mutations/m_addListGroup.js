
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const ADD_LIST_GROUP = gql`
  mutation addListGroup($token: String!, $title: String!, $group: String!) {
    addListGroup(token: $token, title: $title, group: $group) {
      ...ListDetails
      group {
        ...GroupDetails
      }
    }
  }
  ${GROUP_DETAILS}
  ${LIST_DETAILS}
`;