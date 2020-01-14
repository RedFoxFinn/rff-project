
import gql from 'graphql-tag';
import {COMMENT_DETAILS} from '../fragments/f_commentFragment';

export const REMOVE_COMMENT = gql`
  mutation removeComment($token: String!, $id: String!) {
    removeComment(token: $token, id: $id) {
      ...CommentDetails
    }
  }
  ${COMMENT_DETAILS}
`;