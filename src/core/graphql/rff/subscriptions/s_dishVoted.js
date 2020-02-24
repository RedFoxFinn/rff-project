
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISH_VOTED = gql`
  subscription {
    dishVoted {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;