import axios from 'axios'

const wpApi = axios.create({
  baseURL: 'http://localhost:8080/wp-json/wp/v2',
})

export const getPosts = ({ page = 1, perPage = 10, search = '' } = {}) =>
  wpApi.get('/posts', {
    params: {
      page,
      per_page: perPage,
      search: search || undefined,
      _embed: true,
    },
  })

export const getPost = (id) =>
  wpApi.get(`/posts/${id}`, { params: { _embed: true } })
