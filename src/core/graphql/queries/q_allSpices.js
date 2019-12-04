
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const ALL_SPICES = gql`
  query {
    allSpices {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;