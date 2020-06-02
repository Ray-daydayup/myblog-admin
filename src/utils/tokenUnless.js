class TokenUnless {
  constructor() {
    // 排除规则，元素可以是正则
    this.exclusionRules = []
  }

  unless(arr = []) {
    this.exclusionRules = arr
    return this
  }

  /**
   * @param {String} url 请求路径
   * @return {Boolean} flag 校验结果，true 为需要 token 校验，false 为不需要
   */
  checkUrl(url) {
    // 空数组时全部校验返回 true
    // 找到对应的 url 则 返回 false
    const flag = this.exclusionRules.some((item) => {
      if (typeof item === 'string') {
        return item === url
      }
      if (item instanceof RegExp) {
        return item.test(url)
      }
      return false
    })
    return !flag
  }
}

export default new TokenUnless()
