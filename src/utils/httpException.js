import store from '@/store'
/**
 * @param {String} msg 提示文本
 * @return {Function} 处理函数
 * 工厂函数，制造处理函数
 */
const handler = (flag, callback) => {
  return (res) => {
    if (callback) {
      callback(res)
    }
    return flag
  }
}

const handler200 = function(response) {
  console.log(response)
}

const handler404 = function(response) {
  console.log(response)
  store.dispatch('popup/showSnackbar', ['接口未找到', 'error', 6000])
}

const handler500 = function(response) {
  console.log(response)
  store.dispatch('popup/showSnackbar', ['服务器错误', 'error', 6000])
}

const handler401 = async function(response) {
  console.log(response)
  store.dispatch('user/showLogin', 'Token认证失败！请重新登录')
}

const httpExceptionMap = new Map()

httpExceptionMap.set(200, handler(true, handler200))
httpExceptionMap.set(400, handler(false, handler500))
httpExceptionMap.set(401, handler(false, handler401))
httpExceptionMap.set(404, handler(false, handler404))
httpExceptionMap.set(500, handler(false, handler500))

const handleResponse = function(response) {
  const resStatus = response.status
  if (httpExceptionMap.has(resStatus)) {
    return httpExceptionMap.get(resStatus)(response.data)
  } else {
    console.log('发生未知响应错误 >>', response)
    handler500()
    return false
  }
}
export default handleResponse
