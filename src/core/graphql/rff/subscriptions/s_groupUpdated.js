
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const GROUP_UPDATED = gql`
  subscription {
    groupUpdated {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;