import http from '@/utils/http'

export const getCategory = async function(id) {
  const res = await http.get(`/category/list/${id}`)
  return res
}

export const getCategories = async function() {
  const res = await http.get('/category/list')
  return res
}

export const delCategory = async function(id) {
  const res = await http.post(`/category/del/${id}`)
  return res
}

export const addCategory = async function(data) {
  const res = await http.post('/category/add', data)
  return res
}
/**
 * 修改分类
 * @param {Object} data id: Number ,name: String, description: String
 */
export const updateCategory = async function(data) {
  const res = await http.post('/category/update', data)
  return res
}

export default {
  getCategory,
  getCategories,
  delCategory,
  addCategory,
  updateCategory
}
