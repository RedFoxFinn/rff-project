
import gql from 'graphql-tag';
import {PRIVATE_LIST_DETAILS} from '../fragments/f_privateListFragment';

export const PRIVATE_LISTS = gql`
  query privateLists($token: String!) {
    privateLists(token: $token) {
      ...PrivateListDetails
    }
  }
  ${PRIVATE_LIST_DETAILS}
`;