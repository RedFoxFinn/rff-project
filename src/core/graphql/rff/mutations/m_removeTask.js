
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const REMOVE_TASK = gql`
  mutation removeTask($token: String!, $id: String!, $listID: String!) {
    removeTask(token: $token, id: $id, listID: $listID) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;