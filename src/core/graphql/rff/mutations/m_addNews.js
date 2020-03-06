
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const ADD_NEWS = gql`
  mutation addNews($token: String!, $news: String!, $category: String!) {
    addNews(token: $token, news: $news, category: $category) {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;