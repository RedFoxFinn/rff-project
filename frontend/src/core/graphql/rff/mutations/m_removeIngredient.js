
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const REMOVE_INGREDIENT = gql`
  mutation removeIngredient($token: String!, $id: String!) {
    removeIngredient(token: $token, id: $id) {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;