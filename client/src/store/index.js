import Vue from 'vue'
import Vuex from 'vuex'

import {gql} from "apollo-boost";
import {apolloClient} from "../main"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
    getPosts: ({commit}) => {
      commit('setLoading', true)
      apolloClient
      .query({
        query: gql`
            query {
                getPosts {
                    title
                    imageUrl
                }
            }
        `
      }).then(({data}) => {
        commit('setPosts', data.getPosts)
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
    }
  },
  getters: {
    posts: state => state.posts
  },
  modules: {}
})
