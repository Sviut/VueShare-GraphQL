import { gql } from 'apollo-boost'

export const GET_POSTS = gql`
    query {
        getPosts {
            title
            imageUrl
        }
    }
`

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            _id
            username
            email
            password
            avatar
            joinDate
            favorites {
                _id
                title
                imageUrl
            }
        }
    }
`

export const ADD_POST = gql`
    mutation ($title: String!,$imageUrl: String!,$categories: [String]!,$description: String!,$creatorId: ID!) {
        addPost(
            title: $title,
            imageUrl: $imageUrl,
            categories: $categories,
            description: $description,
            creatorId: $creatorId
        ) {
            _id
            title
            imageUrl
            categories
            description
        }
    }
`

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signInUser(username: $username, password: $password) {
            token
        }
    }
`

export const SIGNUP_USER = gql`
    mutation($username: String!, $password: String!, $email: String!) {
        signUpUser(username: $username, password: $password, email: $email) {
            token
        }
    }
`
