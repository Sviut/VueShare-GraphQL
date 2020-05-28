<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="error">
      <v-flex x12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <v-row row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignInMethod">
            <v-container>
              <v-col>
                <v-text-field :rules="usernameRules" v-model="username" prepend-icon="mdi-face" label="Username"
                              type="text"
                              required></v-text-field>

                <v-text-field :rules="passwordRules" v-model="password" prepend-icon="mdi-puzzle" label="Password"
                              type="password"
                              required></v-text-field>
              </v-col>

              <v-col>
                <v-layout column align-center>
                  <v-btn :disabled="!isFormValid" class="mb-2" color="accent" type="submit">Signin</v-btn>
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
        password: '',
        usernameRules: [
          username => !!username || 'Username is required',
          username => username.length < 10 || 'Username must be less than 10 characters'
        ],
        passwordRules: [
          password => !!password || 'Password is required'
        ],
        isFormValid: true
      }
    },
    computed: {
      ...mapGetters(['user', 'error'])
    },
    watch: {
      user(value) {
        if (value) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      handleSignInMethod() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signInUser', {
            username: this.username,
            password: this.password
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
