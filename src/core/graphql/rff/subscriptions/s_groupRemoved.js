
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const GROUP_REMOVED = gql`
  subscription {
    groupRemoved {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;