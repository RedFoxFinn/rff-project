
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const CATEGORY_NEWS = gql`
  query categoryNews($category: String!) {
    categoryNews(category: $category) {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;