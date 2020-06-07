/**
 * 权限校验：
 *  Vue Router中的 前置钩子函数 beforeEach(to, from, next)
 * 当进行路由跳转之前，进行判断 是否已经登录 过，登录过则允许访问非登录页面，否则 回到登录页
 *
 * to:  即将要进入的目标路由对象
 * from: 即将要离开的路由对象
 * next: 是一个方法，可以指定路由地址，进行路由跳转
 */

import router from './index'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // console.log('token', token)
  if (!token) {
    store.dispatch('user/showLogin', '登录')
    if (to.path !== '/' && to.path !== '/home') {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
    // next()
  } else {
    next()
  }
})
