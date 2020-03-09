
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const NEWS_ADDED = gql`
  subscription {
    newsAdded {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;