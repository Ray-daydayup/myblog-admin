import http from '@/utils/http'

export const getArticleList = async function(page, pageSize) {
  const res = await http.post(`/article/list/${page}/${pageSize}`, {
    moreDetail: false
  })
  return res
}

export const getArticleById = async function(id) {
  const res = await http.get(`/article/list/${id}`)
  return res
}
export const addArticle = async function(data) {
  const res = await http.post('/article/add', data)
  return res
}
export const delArticle = async function(id) {
  const res = await http.post(`/article/del/${id}`)
  return res
}

export const updateArticle = async function(data) {
  const res = await http.post('/article/update', data)
  return res
}

export default {}
