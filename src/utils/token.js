import { TOKEN_KEY } from '@/config.js'

// 获取 token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
// 保存 token
export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token)
}
// 移除 token
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
