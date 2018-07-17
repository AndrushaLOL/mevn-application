import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/HelloWorld'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'

Vue.use(Router)
/* eslint-disable */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/posts',
    	name: 'Posts',
    	component: Posts
    },
    {
    	path: '/new',
    	name: 'newPost',
    	component: NewPost
    },
    {
      path: '/edit/:id',
      name: 'EditPost',
      component: EditPost
    }
  ]
})
