
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASK_PRIORITY = gql`
  mutation taskPriority($token: String!, $id: String!, $priority: Boolean!) {
    taskPriority(token: $token, id: $id, priority: $priority) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;