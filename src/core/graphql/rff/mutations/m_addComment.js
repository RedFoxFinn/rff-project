
import gql from 'graphql-tag';
import {COMMENT_DETAILS} from '../fragments/f_commentFragment';

export const ADD_COMMENT = gql`
  mutation addComment($token: String!, $comment: String!, $listID: String!) {
    addComment(token: $token, comment: $comment, listID: $listID) {
      ...CommentDetails
    }
  }
  ${COMMENT_DETAILS}
`;