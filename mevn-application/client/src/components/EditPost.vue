<template>
  <v-app>
    <div>
      <v-flex xs6 offset-xs3>
        <v-text-field
          v-model="title"
          label="Title"
        ></v-text-field>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-textarea
          name="input-7-1"
          label="Description"
          v-model="description"
        ></v-textarea>
      </v-flex>
      <v-btn @click="updatePost()" color="primary">Update</v-btn>
    </div>
  </v-app>
</template>

<script>
  import PostsService from '@/services/PostsService'

  export default {
    name: "EditPost",
    data() {
      return {
        title: '',
        description: ''
      }
    },
    mounted() {
      this.getPost()
    },
    methods: {
      async getPost() {
        var response = await PostsService.getPost(this.$route.params.id)

        this.title = response.data.title || ''
        this.description = response.data.description || ''
      },
      async updatePost() {
        await PostsService.updatePost({
          id: this.$route.params.id,
          title: this.title,
          description: this.description
        })
        this.$router.push({name: 'Posts'})
      }
    }
  }
</script>

<style scoped>

</style>
