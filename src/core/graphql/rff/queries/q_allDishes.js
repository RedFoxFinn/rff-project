
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const ALL_DISHES = gql`
  query {
    allDishes {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;