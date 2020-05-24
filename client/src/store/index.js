import Vue from 'vue'
import Vuex from 'vuex'

import {gql} from "apollo-boost";
import {apolloClient} from "../main"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    }
  },
  actions: {
    getPosts: ({commit}) => {
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
