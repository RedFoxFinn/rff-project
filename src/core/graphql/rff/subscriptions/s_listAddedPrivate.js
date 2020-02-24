
import gql from 'graphql-tag';
import {PRIVATE_LIST_DETAILS} from '../fragments/f_privateListFragment';

export const LIST_ADDED_PRIVATE = gql`
  subscription {
    ...PrivateListDetails
  }
  ${PRIVATE_LIST_DETAILS}
`;