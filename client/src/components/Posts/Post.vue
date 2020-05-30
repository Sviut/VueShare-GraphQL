<template>
  <v-container v-if="getPost" class="mt-3 d-flex flex-column justify-center">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{getPost.title}}</h1>
            <v-btn @click="handleToggleLike" large icon v-if="user">
              <v-icon large color="grey">mdi-heart</v-icon>
            </v-btn>
            <h3 class="ml-3 font-weight-thin">{{getPost.likes}} LIKES</h3>
            <v-spacer></v-spacer>
            <v-icon @click="goToPreviousPage" large color="info">mdi-arrow-left</v-icon>
          </v-card-title>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-img @click="toggleImageDialog" v-on="on" height="400px" :src="getPost.imageUrl"></v-img>
            </template>
            <span>Click to enlarge image</span>
          </v-tooltip>

          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="getPost.imageUrl" height="100vh">
              </v-img>
            </v-card>
          </v-dialog>

          <v-card-text>
            <span v-for="(category, index) in getPost.categories" :key="index">
              <v-chip class="mb-3" color="accent" text-color="white">{{category}}</v-chip>
            </span>
            <h3>{{getPost.description}}</h3>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>

    <div class="mt-3">
      <v-layout class="mb-3" v-if="user">
        <v-flex xs12>
          <v-form v-model="isValidForm" lazy-validation ref="form" @submit.prevent="handleAddPostMessage">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                        :rules="messageRules"
                        @click:append-outer="handleAddPostMessage"
                        v-model="messageBody" clearable :append-outer-icon="messageBody && 'mdi-send'"
                        label="Add Message" type="text" prepend-icon="mdi-email">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-list subheader two-line>
            <v-subheader>Messages ({{getPost.messages.length}})</v-subheader>

            <v-list-item v-for="message in getPost.messages" :key="message._id">

              <v-list-item-avatar>
                <v-img :src="message.messageUser.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{message.messageBody}}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{message.messageUser.username}}
                  <span class="grey--text text--lighten-1 hidden-xs-only">{{message.messageDate}}</span>
                </v-list-item-subtitle>
                <v-divider :key="message._id"></v-divider>
              </v-list-item-content>

              <v-list-item-action class="hidden-xs-only">
                <v-icon color="grey">mdi-comment</v-icon>
              </v-list-item-action>

            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  import { ADD_POST_MESSAGE, GET_POST, LIKE_POST, UNLIKE_POST } from '../../../queries'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Post',
    props: ['postId'],
    data() {
      return {
        dialog: false,
        messageBody: '',
        isValidForm: true,
        messageRules: [
          message => !!message || 'Message is required',
          message => message?.length < 50 || 'Message must be less than 50 characters'
        ],
        postLiked: false
      }
    },
    apollo: {
      getPost: {
        query: GET_POST,
        variables() {
          return {
            postId: this.postId
          }
        }
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      handleAddPostMessage() {
        if (!this.$refs.form.validate()) {
          return
        }

        const variables = {
          messageBody: this.messageBody,
          userId: this.user._id,
          postId: this.postId
        }

        this.$apollo.mutate({
          mutation: ADD_POST_MESSAGE,
          variables,
          update: (cache, { data: { addPostMessage } }) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            })
            data.getPost.messages.unshift(addPostMessage)
            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            })
          }
        }).then(() => this.$refs.form.reset())
      },
      goToPreviousPage() {
        this.$router.go(-1)
      },
      toggleImageDialog() {
        if (window.innerWidth > 500) {
          this.dialog = !this.dialog
        }
      },
      handleLikePost() {
        const variables = {
          postId: this.postId,
          username: this.user.username
        }

        this.$apollo.mutate({
          mutation: LIKE_POST,
          variables,
          update: (cache, { data: { likePost } }) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            })
            data.getPost.likes += 1
            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            })
          }
        })
        .then(({data})=> {
          const updatedUser = {...this.user, favorites: data.likePost.favorites}
          this.$store.commit('setUser', updatedUser)
        })
        .catch(err => console.log(err))
      },
      handleUnlikePost() {
        const variables = {
          postId: this.postId,
          username: this.user.username
        }

        this.$apollo.mutate({
          mutation: UNLIKE_POST,
          variables,
          update: (cache, { data: { likePost } }) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            })
            data.getPost.likes -= 1
            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            })
          }
        })
          .then(({data})=> {
            const updatedUser = {...this.user, favorites: data.unlikePost.favorites}
            this.$store.commit('setUser', updatedUser)
          })
          .catch(err => console.log(err))
      },
      handleToggleLike() {
        this.postLiked ? this.handleLikePost() : this.handleUnlikePost()
      }
    }
  }
</script>

<style scoped>

</style>
