
import gql from 'graphql-tag';

export const MAJOR_DBE = gql`
  subscription {
    majorDBE {
      majorDBE
    }
  }
`;