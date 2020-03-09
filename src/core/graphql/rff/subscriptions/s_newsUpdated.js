
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const NEWS_UPDATED = gql`
  subscription {
    newsUpdated {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;