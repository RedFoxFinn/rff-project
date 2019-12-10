
import gql from 'graphql-tag';
import {COMMENT_DETAILS} from '../fragments/f_commentFragment';

export const comments = gql`
  query comments($token: String!, $id: String!) {
    comments(token: $token, id: $id) {
      ...CommentDetails
    }
  }
  ${COMMENT_DETAILS}
`;