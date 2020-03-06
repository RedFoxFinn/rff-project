
import gql from 'graphql-tag';

export const NEWS_DETAILS = gql`
  fragment NewsDetails on News {
    news
    category
    addedBy {
      username
    }
    id
  }
`;