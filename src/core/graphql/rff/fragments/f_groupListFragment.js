
import gql from 'graphql-tag';

export const GROUP_LIST_DETAILS = gql`
    fragment GroupListDetails on GroupList {
        title
        listType
        removable
        id
        group {
            title
            id
        }
    }
`;