
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const METHOD_DETAILS = gql`
  fragment MethodDetails on CookingMethod {
    name
    uses
    id
    addedBy {
        ...UserDetails
    }
  }
  ${USER_DETAILS}
`;