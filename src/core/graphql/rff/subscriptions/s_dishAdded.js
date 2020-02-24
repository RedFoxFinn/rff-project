
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISH_ADDED = gql`
  subscription {
    dishAdded {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;