import http from '@/utils/http'
import { setToken } from '@/utils/token'

export const login = async function(data) {
  const res = await http.post('/user/login', data)
  if (res) {
    setToken(res.token)
    return res
  }
  return false
}
