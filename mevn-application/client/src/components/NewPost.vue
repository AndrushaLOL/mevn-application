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
      <v-btn @click="addPost()">Submit</v-btn>
    </div>
  </v-app>
</template>

<script>
  import PostsService from '@/services/PostsService'

  export default {
    name: 'NewPost',
    data() {
      return {
        title: '',
        description: ''
      }
    },
    methods: {
      async addPost() {
        await PostsService.addPost({
          title: this.title,
          description: this.description
        })

        this.title = ''
        this.description = ''

        this.$router.push({name: 'Posts'})
      }
    }
  }
</script>
