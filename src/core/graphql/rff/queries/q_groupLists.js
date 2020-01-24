
import gql from 'graphql-tag';
import {GROUP_LIST_DETAILS} from '../fragments/f_groupListFragment';

export const GROUP_LISTS = gql`
  query groupLists($token: String!) {
    groupLists(token: $token) {
      ...GroupListDetails
    }
  }
  ${GROUP_LIST_DETAILS}
`;