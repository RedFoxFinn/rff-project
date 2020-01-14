
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const REMOVE_DISH = gql`
  mutation removeDish($token: String!, $id: String!) {
    removeDish(token: $token, id: $id) {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;