<template>
    <v-container fill-height>
        <v-layout v-if="loading && !posts.length" row align-center justify-center>
            <v-progress-circular indeterminate :size="70" :width="7"></v-progress-circular>
        </v-layout>

        <v-flex v-else-if="posts.length" xs12>
            <v-carousel hide-delimiters cycle interval="3000">
                <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
                    <h1 class="carousel__title">{{post.title}}</h1>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    created () {
      this.handleGetCarouselPosts()
    },
    computed: {
      ...mapGetters(['posts', 'loading'])
    },
    methods: {
      handleGetCarouselPosts () {
        this.$store.dispatch('getPosts')
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
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
