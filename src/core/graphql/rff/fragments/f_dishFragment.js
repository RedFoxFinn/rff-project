
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';
import {DISH_INGREDIENT_DETAILS} from './f_dishIngredientFragment';
import {DISH_METHOD_DETAILS} from './f_dishMethodFragment';

export const DISH_DETAILS = gql`
  fragment DishDetails on Dish {
    name
    cookingMethods {
        ...DishMethodDetails
    }
    proteins {
        ...DishIngredientDetails
    }
    carbs {
        ...DishIngredientDetails
    }
    spices {
        ...DishIngredientDetails
    }
    karma
    note
    addedBy {
      ...UserDetails
    }
    id
  }
  ${USER_DETAILS}
  ${DISH_INGREDIENT_DETAILS}
  ${DISH_METHOD_DETAILS}
`;