
import gql from 'graphql-tag';
import {GROUP_LIST_DETAILS} from '../fragments/f_groupListFragment';

export const ADD_LIST_GROUP = gql`
  mutation addListGroup($token: String!, $title: String!, $group: String!) {
    addListGroup(token: $token, title: $title, group: $group) {
      ...GroupListDetails
    }
  }
  ${GROUP_LIST_DETAILS}
`;