import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },
  addPost (params) {
  	return Api().post('posts', params)
  },
  deletePost (id) {
    return Api().delete('posts/' + id);
  },
  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },
  getPost (id) {
    return Api().get('posts/' + id)
  }
}
