<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <v-row row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-form @submit.prevent="handleSignInMethod">
            <v-container>
              <v-col>
                <v-text-field v-model="username" prepend-icon="mdi-face" label="Username" type="text"
                              required></v-text-field>

                <v-text-field v-model="password" prepend-icon="mdi-puzzle" label="Password" type="password"
                              required></v-text-field>
              </v-col>

              <v-col>
                <v-layout column align-center>
                  <v-btn class="mb-2" color="accent" type="submit">Signin</v-btn>
                  <h3>Already have an account?
                    <router-link to="/singup">Signup</router-link>
                  </h3>
                </v-layout>
              </v-col>

            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Signin',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    watch: {
      user(value) {
        if (value) {
          console.log(value)
          this.$router.push('/')
        }
      }
    },
    methods: {
      handleSignInMethod() {
        this.$store.dispatch('signInUser', {
          username: this.username,
          password: this.password
        })
      }
    }
  }
</script>

<style scoped>

</style>
