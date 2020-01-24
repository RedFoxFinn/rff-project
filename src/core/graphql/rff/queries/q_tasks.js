
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASKS = gql`
  query tasks($token: String!, $listID: String!) {
    tasks(token: $token, listID: $listID) {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;