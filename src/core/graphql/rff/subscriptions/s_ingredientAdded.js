
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const INGREDIENT_ADDED = gql`
  subscription {
    ingredientAdded {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;