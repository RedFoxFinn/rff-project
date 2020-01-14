
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    type
    name
    uses
    addedBy {
      ...UserDetails
    }
    id
  }
  ${USER_DETAILS}
`;