<template>
  <v-container v-if="getPost" class="mt-3 d-flex flex-column justify-center">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{getPost.title}}</h1>
            <v-btn large icon v-if="user">
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
          <v-form>
            <v-layout row>
              <v-flex xs12>
                <v-text-field clearable append-icon="mdi-send" label="Add Message" type="text" prepend-icon="mdi-email">

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

            <template v-for="message in getPost.messages">

              <v-divider :key="message._id"></v-divider>
              <v-list-item-avatar>
                <v-img :src="message.messageUser.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-title>
                {{message.messageBody}}
              </v-list-item-title>

              <v-list-item-subtitle>
                {{message.messageUser.username}}
                <span class="grey--text text--lighten-1 hidden-xs-only">{{message.messageDate}}</span>
              </v-list-item-subtitle>

              <v-list-item-action class="hidden-xs-only">
                <v-icon color="grey">mdi-bubble</v-icon>
              </v-list-item-action>

            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  import { GET_POST } from '../../../queries'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Post',
    props: ['postId'],
    data() {
      return {
        dialog: false
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
      goToPreviousPage() {
        this.$router.go(-1)
      },
      toggleImageDialog() {
        if (window.innerWidth > 500) {
          this.dialog = !this.dialog
        }
      }
    }
  }
</script>

<style scoped>

</style>
