
import gql from 'graphql-tag';
import {TASK_DETAILS} from '../fragments/f_taskFragment';

export const TASK_UPDATED = gql`
  subscription {
    taskUpdated {
      ...TaskDetails
    }
  }
  ${TASK_DETAILS}
`;