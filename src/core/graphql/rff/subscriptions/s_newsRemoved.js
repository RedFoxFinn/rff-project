
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const NEWS_REMOVED = gql`
  subscription {
    newsRemoved {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;