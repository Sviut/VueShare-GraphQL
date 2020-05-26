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
                <v-list-item v-for="item in menuButtons" :key="item.title" :to="item.link">
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
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
                <v-btn text v-for="btn in menuButtons" :key="btn.title" :to="btn.link">
                    <v-icon class="hidden-sm-only" left>{{btn.icon}}</v-icon>
                    {{btn.title}}
                </v-btn>
            </v-toolbar-items>

        </v-app-bar>

        <v-content>
            <transition name="fade">
                <router-view/>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuButtons () {
        return [
          { icon: 'mdi-message-text', title: 'Posts', link: '/posts' },
          { icon: 'mdi-lock', title: 'Sign In', link: '/signin' },
          { icon: 'mdi-pencil ', title: 'Sign Up', link: '/signup' },
        ]
      }
    },
    methods: {
      toggleSideNav () {
        this.sideNav = !this.sideNav
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
</style>
