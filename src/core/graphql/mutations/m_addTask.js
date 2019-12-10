
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const ADD_TASK = gql`
  mutation addTask($token: String!, $task: String!, $listID: String!, $priority: Boolean!) {
    addTask(token: $token, task: $task, listID: $listID, priority: $priority) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;