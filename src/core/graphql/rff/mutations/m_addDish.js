
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const ADD_DISH = gql`
  mutation addDish($token: String!, $name: String!, $cookingMethods: [String!]!,
    $carbs: [String!]!, $proteins: [String!]!, $spices: [String!]!, $note: String!) {
    addDish(token: $token, name: $name, cookingMethods: $cookingMethods,
      carbs: $carbs, proteins: $proteins, spices: $spices, note: $note) {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;