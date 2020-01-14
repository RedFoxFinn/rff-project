
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const ADD_METHOD = gql`
  mutation addMethod($token: String!, $name: String!) {
    addMethod(token: $token, name: $name) {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;