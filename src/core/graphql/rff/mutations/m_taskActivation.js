
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASK_ACTIVATION = gql`
  mutation taskActivation($token: String!, $id: String!) {
    taskActivation(token: $token, id: $id) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;