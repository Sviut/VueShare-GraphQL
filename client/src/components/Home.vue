<template>
  <v-container>
    <v-flex xs12>
      <v-carousel hide-delimiters v-if="posts" cycle interval="3000">
        <v-carousel-item v-for="post in posts" :key="post.title" :src="post.imageUrl">
          <h1 class="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
  import {gql} from 'apollo-boost'

  export default {
    name: 'Home',
    created() {
      this.handleGetCarouselPosts()
    },
    computed: {
      posts() {
        return this.$store.getters.posts
      }
    },
    methods: {
      handleGetCarouselPosts() {
        this.$store.dispatch("getPosts")
      }
    }
  }
</script>

<style scoped>
  .carousel__title {
    text-align: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 5px 5px 0 0;
    padding: 0.5rem;
    margin: 0 auto;
    bottom: 0px;
    left: 0;
    right: 0;
  }
</style>
