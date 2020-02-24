
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISH_UPDATED = gql`
  subscription {
    dishUpdated {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;