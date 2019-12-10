
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const GROUP_LISTS = gql`
  query groupLists($token: String!) {
    groupLists(token: $token) {
      ...ListDetails
      group {
        ...GroupDetails
      }
    }
  }
  ${GROUP_DETAILS}
  ${LIST_DETAILS}
`;