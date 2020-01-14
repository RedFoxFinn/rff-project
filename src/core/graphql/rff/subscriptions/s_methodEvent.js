
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const METHOD_EVENT = gql`
  subscription {
    methodEvent {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;