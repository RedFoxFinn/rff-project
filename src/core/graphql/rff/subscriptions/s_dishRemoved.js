
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISH_REMOVED = gql`
  subscription {
    dishRemoved {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;