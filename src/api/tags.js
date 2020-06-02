import http from '@/utils/http'

export const getTag = async function(id) {
  const res = await http.get(`/tag/list/${id}`)
  return res
}

export const getTagList = async function() {
  const res = await http.get('/tag/list')
  return res
}

export const delTag = async function(id) {
  const res = await http.post(`/tag/del/${id}`)
  return res
}

export const addTag = async function(data) {
  const res = await http.post('/tag/add', data)
  return res
}
/**
 * 修改标签
 * @param {Object} data id: Number ,name: String, description: String
 */
export const updateTag = async function(data) {
  const res = await http.post('/tag/update', data)
  return res
}

export default {
  getTag,
  getTagList,
  delTag,
  addTag,
  updateTag
}
