
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const UPDATE_DISH = gql`
  mutation updateDish($token: String!, $id: String!, $name: String!, $cookingMethods: [String!]!,
    $carbs: [String!]!, $proteins: [String!]!, $spices: [String!]!, $karma: Int, $note: String!) {
    updateDish(token: $token, id: $id, name: $name, cookingMethods: $cookingMethods,
      carbs: $carbs, proteins: $proteins, spices: $spices, karma: $karma, note: $note) {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;