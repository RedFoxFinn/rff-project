
import gql from 'graphql-tag';
import {USER_DETAILS} from './f_userFragment';

export const COMMENT_DETAILS = gql`
  fragment CommentDetails on Comment {
    comment
    karma
    addedBy {
      ...UserDetails
    }
    listID
    id
  }
  ${USER_DETAILS}
`;