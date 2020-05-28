<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get Started Here !</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="error">
      <v-flex x12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <v-row row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card dark color="primary">
          <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignUpMethod">
            <v-container>
              <v-col>
                <v-text-field :rules="usernameRules" v-model="username" prepend-icon="mdi-face" label="Username"
                              type="text"
                              required></v-text-field>

                <v-text-field :rules="emailRules" v-model="email" prepend-icon="mdi-email" label="Email"
                              type="email"
                              required></v-text-field>

                <v-text-field :rules="passwordRules" v-model="password" prepend-icon="mdi-puzzle" label="Password"
                              type="password"
                              required></v-text-field>

                <v-text-field :rules="passwordRules" v-model="password2" prepend-icon="mdi-gavel" label="Password"
                              type="password"
                              required></v-text-field>
              </v-col>

              <v-col>
                <v-layout column align-center>
                  <v-btn :disabled="!isFormValid" class="mb-2" color="accent" type="submit">Signin</v-btn>
                  <h3>Already have an account?
                    <router-link class="green--text" to="/singup">Signup</router-link>
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
    name: 'Signup',
    data() {
      return {
        isFormValid: true,
        username: '',
        email: '',
        password: '',
        password2: '',
        usernameRules: [
          username => !!username || 'Username is required',
          username => username.length < 10 || 'Username cannot be more than 10 characters'
        ],
        emailRules: [
          email => !!email || 'Email is required',
          email => /.@+./.test(email) || 'Email must be valid'
        ],
        passwordRules: [
          password => !!password || 'Password is required',
          password => password.length >= 4 || 'Password must be at least 4 characters',
          password2 => password2 === this.password || 'Password must match'
        ],
      }
    },
    computed: {
      ...mapGetters(['error','user'])
    },
    watch: {
      user(value) {
        if (value) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      handleSignUpMethod() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signUpUser', {
            username: this.username,
            password: this.password,
            email: this.email
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
