
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const REMOVE_TASK = gql`
  mutation removeTask($token: String!, $id: String!) {
    removeTask(token: $token, id: $id) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;