
import gql from 'graphql-tag';
import {COMMENT_DETAILS} from '../fragments/f_commentFragment';

export const VOTE_COMMENT = gql`
  mutation voteComment($token: String!, $id: String!, $vote: String!) {
    voteComment(token: $token, id: $id, vote: $vote) {
      ...CommentDetails
    }
  }
  ${COMMENT_DETAILS}
`;