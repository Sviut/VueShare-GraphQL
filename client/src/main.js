import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import FormAlert from './components/Shared/FormAlert'

Vue.use(VueApollo).component('form-alert', FormAlert)

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    if (!localStorage.token) {
      localStorage.setItem('token', '')
    }

    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError({ graphQLErrors, networkError }) {
    if (networkError) {
      console.error('[networkError]', networkError)
    }

    if (graphQLErrors) {
      for (let error of graphQLErrors) {
        console.error('[graphQLErrors]', error.message)
        if (error.name === 'AuthenticationError') {
          store.commit('setAuthError', error)
          store.dispatch('signOutUser')
        }
      }
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
