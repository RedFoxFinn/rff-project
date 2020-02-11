
import gql from 'graphql-tag';

export const DISH_INGREDIENT_DETAILS = gql`
    fragment DishIngredientDetails on Ingredient {
        type
        name
        id
    }
`;