
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const METHOD_ADDED = gql`
  subscription {
    methodAdded {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;