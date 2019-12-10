
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const GROUP_DETAILS = gql`
  fragment GroupDetails on Group {
    title
    active
    removable
    creator {
      ...UserDetails
    }
    id
  }
  ${USER_DETAILS}
`;