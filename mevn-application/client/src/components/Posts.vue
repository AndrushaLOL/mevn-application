<template>
  <v-app>
    <div class="posts">
      <h1>Posts</h1>
      <v-btn to="/new" color="primary">Add new Post</v-btn>
      <v-flex xs6 offset-xs3 mt-3>
        <v-expansion-panel>
          <v-slide-x-transition
            v-for="post in posts"
            :key="posts._id">
            <v-expansion-panel-content>
              <div slot="header">
                {{ post.title }}

              </div>
              <v-card>
                <v-card-text>{{ post.description }}</v-card-text>
                <v-card-actions>
                  <v-btn flat color="red" @click="deletePost(post._id)">remove</v-btn>
                  <v-btn flat color="orange" :to="{ name: 'EditPost', params: {id: post._id} }">Edit</v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-slide-x-transition>
        </v-expansion-panel>

      </v-flex>
    </div>
  </v-app>
</template>

<script>
  import PostsService from '@/services/PostsService'

  export default {
    name: 'posts',
    data() {
      return {
        posts: []
      }
    },
    mounted() {
      this.getPosts()
    },
    methods: {
      async getPosts() {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      },
      async deletePost(id) {
        await PostsService.deletePost(id)
        this.getPosts()

      }
    },
    beforeRouteUpdate(to, from, next) {
      this.getPosts()
      next()
    }
  }
</script>
