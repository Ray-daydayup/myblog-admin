import http from '@/utils/http'

export const login = async function(data) {
  const res = await http.post('/user/login', data)
  return res
}

export const register = async function(data) {
  const res = await http.post('/user/register', data)
  return res
}

export const getUserInfo = async function() {
  const res = await http.get('/user/info')
  return res
}

export const getUserById = async function(id) {
  const res = await http.get(`/user/list/${id}`)
  return res
}
export const getUserList = async function() {
  const res = await http.get('/user/list')
  return res
}

export const delUser = async function(id) {
  const res = await http.post(`/user/del/${id}`)
  return res
}

export const updateUser = async function(data) {
  const res = await http.post('/user/update', data)
  return res
}

export const setUserState = async function(data) {
  const res = await http.post('/user/state', data)
  return res
}
