
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const REMOVE_METHOD = gql`
  mutation removeMethod($token: String!, $id: String!) {
    removeMethod(token: $token, id: $id) {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;