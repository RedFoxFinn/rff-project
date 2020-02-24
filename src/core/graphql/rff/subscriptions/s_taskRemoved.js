
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASK_REMOVED = gql`
  subscription {
    taskRemoved {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;