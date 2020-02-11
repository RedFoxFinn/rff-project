
import gql from 'graphql-tag';

export const DISH_METHOD_DETAILS = gql`
    fragment DishMethodDetails on CookingMethod {
        name
        id
    }
`;