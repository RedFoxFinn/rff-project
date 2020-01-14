
import gql from 'graphql-tag';
import {LIST_DETAILS} from '../fragments/f_listFragment';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const LIST_EVENT_GROUP = gql`
  subscription {
    listEventGroup {
      ...ListDetails
      group {
        ...GroupDetails
      }
    }
  }
  ${GROUP_DETAILS}
  ${LIST_DETAILS}
`;