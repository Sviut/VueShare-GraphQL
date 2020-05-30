<template>
  <v-app>

    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor:pointer;">
          VueShare GraphQL
        </router-link>
      </v-app-bar>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="user" @click="handleLogOut">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor:pointer;">
          VueShare GraphQL
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field hide-details prepend-icon="mdi-magnify" placeholder="Search posts"></v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="btn in horizontalNavItems" :key="btn.title" :to="btn.link">
          <v-icon class="hidden-sm-only" left>{{btn.icon}}</v-icon>
          {{btn.title}}
        </v-btn>

        <v-btn text to="/profile" v-if="user" :class="{'bounce': badgeAnimated}">
          <v-icon class="hidden-sm-only" left>mdi-account-box</v-icon>
          <v-badge color="green">
            <span v-if="userFavorites.length" slot="badge"
                  >{{userFavorites.length}}</span>
            Profile
          </v-badge>
        </v-btn>

        <v-btn text v-if="user" @click="handleLogOut">
          <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>

      <v-snackbar v-model="authSnackbar" :timeout="5000" color="success" bottom left>
        <v-icon class="mr-3" dark>mdi-check-circle</v-icon>
        <h3>You are now signed in!</h3>
        <v-btn text dark @click="authSnackbar = false">Close</v-btn>
      </v-snackbar>

      <v-snackbar v-if="authError" v-model="authErrorSnackbar" :timeout="5000" color="info" bottom left>
        <v-icon class="mr-3" dark>mdi-cancel</v-icon>
        <h3>{{authError.message}}</h3>
        <v-btn text dark to="/signin">Signin</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        sideNav: false,
        authSnackbar: false,
        authErrorSnackbar: true,
        badgeAnimated: false
      }
    },
    watch: {
      user(newValue, oldValue) {
        if (!oldValue) {
          this.authSnackbar = true
        }
      },
      authError(value) {
        if (value) {
          this.authErrorSnackbar = true
        }
      },
      userFavorites(value) {
        if (value) {
          this.badgeAnimated = true
          setTimeout(() => (this.badgeAnimated = false), 1000)
        }
      }
    },
    computed: {
      ...mapGetters(['user', 'authError', 'userFavorites']),
      sideNavItems() {
        let items = [
          { icon: 'mdi-message-text', title: 'Posts', link: '/posts' },
          { icon: 'mdi-lock', title: 'Sign In', link: '/signin' },
          { icon: 'mdi-pencil ', title: 'Sign Up', link: '/signup' },
        ]
        if (this.user) {
          items = [
            { icon: 'mdi-chat', title: 'Chat', link: '/chat' },
            { icon: 'mdi-star', title: 'Create Post', link: '/post/add' },
            { icon: 'mdi-account-box', title: 'Profile', link: '/profile' },
          ]
        }
        return items
      },
      horizontalNavItems() {
        let items = [
          { icon: 'mdi-message-text', title: 'Posts', link: '/posts' },
          { icon: 'mdi-lock', title: 'Sign In', link: '/signin' },
          { icon: 'mdi-pencil ', title: 'Sign Up', link: '/signup' },
        ]
        if (this.user) {
          items = [
            { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
          ]
        }
        return items
      }
    },
    methods: {
      toggleSideNav() {
        this.sideNav = !this.sideNav
      },
      handleLogOut() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .bounce {
    animation: bounce 1s both;
  }

  @keyframes bounce {
    0%, 20%, 54%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -20px, 0);
    }
    70% {
      transform: translate3d(0, -10px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
</style>
