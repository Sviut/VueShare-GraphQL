<template>
  <v-container class="d-flex flex-column align-center" text-xs-center v-if="infiniteScrollPosts">
    <div v-for="post in infiniteScrollPosts.posts" :key="post._id">
      <v-img :src="post.imageUrl" height="200px" width="200px"/>
      <h3>{{post.title}}</h3>
    </div>
    <v-btn @click="showMorePosts" v-if="showMoreEnabled">Load More</v-btn>
  </v-container>
</template>

<script>
  import { INFINITE_SCROLL_POSTS } from '../../../queries'

  const pageSize = 2

  export default {
    name: 'Posts',
    data() {
      return {
        pageNum: 1,
        showMoreEnabled: true
      }
    },
    apollo: {
      infiniteScrollPosts: {
        query: INFINITE_SCROLL_POSTS,
        variables: {
          pageNum: 1,
          pageSize
        }
      }
    },
    methods: {
      showMorePosts() {
        this.pageNum += 1
        this.$apollo.queries.infiniteScrollPosts.fetchMore({
          variables: {
            pageNum: this.pageNum,
            pageSize
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const newPosts = fetchMoreResult.infiniteScrollPosts.posts
            const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore

            this.showMoreEnabled = hasMore

            return {
              infiniteScrollPosts: {
                __typeName: prevResult.infiniteScrollPosts.__typeName,
                posts: [
                  ...prevResult.infiniteScrollPosts.posts,
                  ...newPosts
                ],
                hasMore
              }
            }
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
