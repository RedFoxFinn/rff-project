
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISH_EVENT = gql`
  subscription {
    dishEvent {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;