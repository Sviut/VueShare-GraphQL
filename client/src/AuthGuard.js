import store from './store'

export default (to, from, next) => {
  console.log('store.getters.user', store.getters.user)
  if (!store.getters.user) {
    next({
      path: '/signin'
    })
  } else {
    next()
  }
}
