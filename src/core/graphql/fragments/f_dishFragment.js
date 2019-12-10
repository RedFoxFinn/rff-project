
import gql from 'graphql-tag';
import {INGREDIENT_DETAILS} from './f_ingredientFragment';
import {METHOD_DETAILS} from './f_methodFragment';
import {USER_DETAILS} from './f_userFragment';

export const DISH_DETAILS = gql`
  fragment DishDetails on Dish {
    name
    cookingMethods {
      ...MethodDetails
    }
    proteins {
      ...IngredientDetails
    }
    carbs {
      ...IngredientDetails
    }
    spices {
      ...IngredientDetails
    }
    karma
    note
    addedBy {
      ...UserDetails
    }
    id
  }
  ${INGREDIENT_DETAILS}
  ${METHOD_DETAILS}
  ${USER_DETAILS}
`;