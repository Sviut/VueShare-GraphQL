import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import { apolloClient } from '../main'
import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER, SIGNUP_USER } from '../../queries'

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
      localStorage.setItem('token','')
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
