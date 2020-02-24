
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const INGREDIENT_UPDATED = gql`
  subscription {
    ingredientUpdated {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;