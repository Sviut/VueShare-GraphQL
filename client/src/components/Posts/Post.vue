<template>
  <v-container>
    <h1>post {{postId}}</h1>
  </v-container>
</template>

<script>
  export default {
    name: 'Post',
    props: ['postId']
  }
</script>

<style scoped>

</style>
