
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const ADD_NEWS = gql`
  mutation addNews($token: String!, $content: String!, $category: String!) {
    addNews(token: $token, content: $content, category: $category) {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;