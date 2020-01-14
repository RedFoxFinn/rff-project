
import gql from 'graphql-tag';

export const ALL_TASK_COUNT = gql`
  query allTaskCount($token: String!) {
    allTaskCount(token: $token)
  }
`;