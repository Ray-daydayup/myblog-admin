import { login } from '@/api/user'
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

const handlerInner = function(response) {
  console.log(response)
}

const handler401 = async function(response) {
  console.log('401,我去要 token 啦', response)
  const data = {
    username: 'ztr',
    password: '1021'
  }
  const res = await login(data)
  if (!res) {
    console.log('没要到 token🙃 >>', res)
  }
  console.log('要到 token 啦😀 >>', res)
}

const httpExceptionMap = new Map()

httpExceptionMap.set(200, handler(true, handlerInner))
httpExceptionMap.set(400, handler(false, handlerInner))
httpExceptionMap.set(401, handler(false, handler401))
httpExceptionMap.set(404, handler(false, handlerInner))
httpExceptionMap.set(500, handler(false, handlerInner))

const handleResponse = function(response) {
  const resStatus = response.status
  if (httpExceptionMap.has(resStatus)) {
    return httpExceptionMap.get(resStatus)(response.data)
  } else {
    console.log('发生未知响应错误 >>', response)
    return false
  }
}
export default handleResponse
