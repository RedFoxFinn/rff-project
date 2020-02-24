
import gql from 'graphql-tag';

export const GROUP_DETAILS = gql`
  fragment GroupDetails on Group {
    title
    active
    removable
    creator {
      username
    }
    id
  }
`;