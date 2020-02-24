
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const METHOD_UPDATED = gql`
  subscription {
    methodUpdated {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;