
import gql from 'graphql-tag';

export const NEWS_DETAILS = gql`
  fragment NewsDetails on News {
    content
    category
    id
  }
`;