
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const METHOD_REMOVED = gql`
  subscription {
    methodRemoved {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;