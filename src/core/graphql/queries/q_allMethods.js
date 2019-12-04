
import gql from 'graphql-tag';
import {METHOD_DETAILS} from '../fragments/f_methodFragment';

export const ALL_METHODS = gql`
  query {
    allMethods {
      ...MethodDetails
    }
  }
  ${METHOD_DETAILS}
`;