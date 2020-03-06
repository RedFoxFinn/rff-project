
import gql from 'graphql-tag';
import {NEWS_DETAILS} from '../fragments/f_newsFragment';

export const NEWS = gql`
  query news {
    news {
      ...NewsDetails
    }
  }
  ${NEWS_DETAILS}
`;