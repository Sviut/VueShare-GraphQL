<template>
  <v-container fluid>
    <v-row v-if="infiniteScrollPosts">
      <v-col class="mx-auto xs12 sm6" v-for="post in infiniteScrollPosts.posts" :key="post._id">
        <v-card hover max-width="300">
          <v-img :src="post.imageUrl" height="30vh"lazy-src="" />

          <v-card-actions>
            <v-card-title>
              <div>
                <div class="headline">{{post.title}}</div>
                <span class="grey--text">{{post.likes}} likes - {{post.messages.length}} comments</span>
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showPostCreator = !showPostCreator">
              <v-icon>{{`mdi-arrow-${showPostCreator ? 'up' : 'down'}`}}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text class="grey lighten-4" v-show="showPostCreator">
              <v-list-item>
                <v-avatar class="mr-3">
                  <v-img :src="post.createdBy.avatar"></v-img>
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{post.createdBy.username}}
                  </v-list-item-title>
                  <v-list-item-subtitle>Added {{ post.createdDate}}</v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { INFINITE_SCROLL_POSTS } from '../../../queries'

  const pageSize = 5

  export default {
    name: 'Posts',
    data() {
      return {
        pageNum: 1,
        showMoreEnabled: true,
        showPostCreator: false
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
