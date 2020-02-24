
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const INGREDIENT_REMOVED = gql`
  subscription {
    ingredientRemoved {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;