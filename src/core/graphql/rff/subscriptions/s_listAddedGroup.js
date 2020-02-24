
import gql from 'graphql-tag';
import {GROUP_LIST_DETAILS} from '../fragments/f_groupListFragment';

export const LIST_ADDED_GROUP = gql`
  subscription {
    ...GroupListDetails
  }
  ${GROUP_LIST_DETAILS}
`;