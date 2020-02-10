
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const DISH_DETAILS = gql`
  fragment DishDetails on Dish {
    name
    cookingMethods {
        name
        uses
        id
    }
    proteins {
        type
        name
        uses
        id
    }
    carbs {
        type
        name
        uses
        id
    }
    spices {
        type
        name
        uses
        id
    }
    karma
    note
    addedBy {
      ...UserDetails
    }
    id
  }
  ${USER_DETAILS}
`;