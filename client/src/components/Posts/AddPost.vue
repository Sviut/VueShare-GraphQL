<template>
  <v-container mt-5 pt-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Add Post</h1>
      </v-flex>
    </v-layout>


    <v-row row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPost">
          <v-col>

            <v-layout row>
              <v-flex xs12>
                <v-text-field :rules="titleRules" v-model="title" label="Title post"
                              type="text"
                              required></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>

                <v-text-field :rules="imageRules" v-model="imageUrl" label="Image URL"
                              type="text"
                              required></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row v-if="imageUrl">
              <v-flex xs12>
                <v-img :src="imageUrl" height="300px"></v-img>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-select :rules="categoriesRules" v-model="categories" :items="['Art','Education','Travel','Photography','Technology']" multiple
                          label="Categories"></v-select>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-textarea :rules="descriptionRules" v-model="description" label="Description"
                              type="text"
                              required></v-textarea>

              </v-flex>
            </v-layout>

          </v-col>

          <v-col>
            <v-layout column align-center>
              <v-btn :disabled="!isFormValid" class="mb-2" color="accent" type="submit">Submit</v-btn>
            </v-layout>
          </v-col>

        </v-form>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AddPost',
    data() {
      return {
        isFormValid: true,
        title: '',
        imageUrl: '',
        categories: [],
        description: '',
        titleRules: [
          title => !!title || 'Title required',
          title => title.length < 20 || 'Title must have less than 20 characters'
        ],
        imageRules: [
          image => !!image || 'Image is required'
        ],
        categoriesRules: [
          categories => categories.length >= 1 || 'At least one category is required'
        ],
        descriptionRules: [
          description => !!description || 'Description is required',
          description => description.length < 200 || 'Description must have less than 200 characters'
        ]
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      handleAddPost() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('addPost', {
            title: this.title,
            imageUrl: this.imageUrl,
            categories: this.categories,
            description: this.description,
            creatorId: this.user._id
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
