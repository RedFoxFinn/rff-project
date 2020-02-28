
import gql from 'graphql-tag';

export const INGREDIENT_DETAILS = gql`
  fragment IngredientDetails on Ingredient {
    type
    name
    uses
    id
    addedBy {
      username
    }
  }
`;