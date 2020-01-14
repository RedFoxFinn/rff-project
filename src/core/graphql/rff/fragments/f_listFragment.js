
import gql from 'graphql-tag';

export const LIST_DETAILS = gql`
  fragment ListDetails on List {
    title
    listType
    removable
    id
  }
`;