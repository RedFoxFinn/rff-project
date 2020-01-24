
import gql from 'graphql-tag';

export const PRIVATE_LIST_DETAILS = gql`
    fragment PrivateListDetails on PrivateList {
        title
        listType
        removable
        id
        owner {
            username
            id
        }
    }
`;