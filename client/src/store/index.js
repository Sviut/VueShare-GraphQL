import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'

import { apolloClient } from '../main'
import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER } from '../../queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false
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
    }
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
      commit('setLoading', true)
      apolloClient
        .query({ query: GET_POSTS })
        .then(({ data }) => {
          commit('setPosts', data.getPosts)
          console.log(data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    signInUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signInUser.token)
          // router.go()
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading
  },
  modules: {}
})
