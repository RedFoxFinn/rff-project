
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from '../fragments/f_ingredientFragment';

export const ALL_CARBS = gql`
  query {
    allCarbs {
      ...IngredientDetails
    }
  }
  ${INGREDIENT_DETAILS}
`;