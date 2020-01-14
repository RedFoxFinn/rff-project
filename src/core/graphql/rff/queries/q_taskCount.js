
import gql from 'graphql-tag';

export const TASK_COUNT = gql`
  query taskCount($token: String!, $countType: String!) {
    taskCount(token: $token, countType: $countType)
  }
`;