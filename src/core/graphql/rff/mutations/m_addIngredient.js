
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const ADD_INGREDIENT = gql`
  mutation addIngredient($token: String!, $name: String!, $type: String!) {
    addIngredient(token: $token, name: $name, type: $type) {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;