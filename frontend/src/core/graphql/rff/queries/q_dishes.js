
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISHES = gql`
  query dishes($carb: String, $protein: String, $spice: String, $method: String) {
    dishes(carb: $carb, protein: $protein, spice: $spice, method: $method) {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;