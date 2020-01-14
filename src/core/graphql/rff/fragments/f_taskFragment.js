
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const TASK_DETAILS = gql`
  fragment TaskDetails on Task {
    task
    active
    priority
    creator {
      ...UserDetails
    }
    listID
    id
  }
  ${USER_DETAILS}
`;