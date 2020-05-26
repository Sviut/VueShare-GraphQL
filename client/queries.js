import { gql } from 'apollo-boost'

export const GET_POSTS = gql`
    query {
        getPosts {
            title
            imageUrl
        }
    }
`
