
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const INGREDIENT_EVENT = gql`
  subscription {
    ingredientEvent {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;