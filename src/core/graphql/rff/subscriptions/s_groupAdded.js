
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const GROUP_ADDED = gql`
  subscription {
    groupAdded {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;