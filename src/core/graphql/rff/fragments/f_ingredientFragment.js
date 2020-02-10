
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    type
    name
    uses
    id
  }
  ${USER_DETAILS}
`;