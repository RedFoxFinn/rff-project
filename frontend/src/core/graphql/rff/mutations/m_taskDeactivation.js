
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASK_DEACTIVATION = gql`
  mutation taskDeactivation($token: String!, $id: String!) {
    taskDeactivation(token: $token, id: $id) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;