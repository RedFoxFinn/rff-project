
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const REMOVE_NEWS = gql`
  mutation removeNews($token: String!, $id: String!) {
    removeNews(token: $token, id: $id) {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;