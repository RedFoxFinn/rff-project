
import gql from 'graphql-tag';
import {DISH_DETAILS} from '../fragments/f_dishFragment';

export const DISH_KARMA = gql`
  mutation dishKarma($token: String!, $id: String!, $vote: String!) {
    dishKarma(token: $token, id: $id, vote: $vote) {
      ...DishDetails
    }
  }
  ${DISH_DETAILS}
`;