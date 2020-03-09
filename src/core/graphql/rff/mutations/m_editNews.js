
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const EDIT_NEWS = gql`
  mutation editNews($token: String!, $id: String!, $content: String!, $category: String!) {
    editNews(token: $token, id: $id, content: $content, category: $category) {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;