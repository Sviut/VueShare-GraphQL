import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import { apolloClient } from '../main'
import { ADD_POST, GET_CURRENT_USER, GET_POSTS, SIGNIN_USER, SIGNUP_USER } from '../../queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
  },
  actions: {
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: addPost }) => {
            const data = cache.readQuery({ query: GET_POSTS })
            data.getPosts.unshift(addPost)
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload
            }
          }
        })
        .then(({ data }) => {
          console.log(data.addPost)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit('setUser', data.getCurrentUser)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    getPosts: ({ commit }) => {
      commit('clearError')
      apolloClient
        .query({ query: GET_POSTS })
        .then(({ data }) => {
          commit('setPosts', data.getPosts)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    signInUser: ({ commit }, payload) => {
      commit('setError', null)
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signInUser.token)
          router.go()
        })
        .catch(err => {
          commit('setError', err)
          console.error(err)
        })
    },
    signUpUser: ({ commit }, payload) => {
      commit('setError', null)
      localStorage.setItem('token', '')
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signUpUser.token)
          router.go()
        })
        .catch(err => {
          commit('setError', err)
          console.error(err)
        })
    },
    logout: async ({ commit }) => {
      commit('clearUser')
      localStorage.setItem('token', '')
      await apolloClient.resetStore()
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  },
  modules: {}
})
