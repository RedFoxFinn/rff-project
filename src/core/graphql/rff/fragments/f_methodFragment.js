
import gql from 'graphql-tag';

export const METHOD_DETAILS = gql`
  fragment MethodDetails on CookingMethod {
    name
    uses
    id
    addedBy {
      username
    }
  }
`;