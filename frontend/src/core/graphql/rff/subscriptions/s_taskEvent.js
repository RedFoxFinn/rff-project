
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASK_EVENT = gql`
  subscription {
    taskEvent {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;