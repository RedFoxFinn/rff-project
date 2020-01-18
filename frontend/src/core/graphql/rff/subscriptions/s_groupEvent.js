
import gql from 'graphql-tag';
import {GROUP_DETAILS} from '../fragments/f_groupFragment';

export const INGREDIENT_EVENT = gql`
  subscription {
    groupEvent {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;