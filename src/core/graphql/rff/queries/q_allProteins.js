
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const ALL_PROTEINS = gql`
  query {
    allProteins {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;