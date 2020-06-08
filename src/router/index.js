import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    meta: { name: '主页' },
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index')
      },
      {
        path: 'articles',
        name: 'articles',
        redirect: '/articles/management',
        meta: { name: '文章管理' },
        component: () => import('@/views/articles/index'),
        children: [
          {
            path: 'management',
            name: 'Management',
            component: () => import('@/views/articles/management/index')
          },
          {
            path: 'edit/:id',
            name: 'Edit',
            props: true,
            meta: { name: '新建文章' },
            component: () => import('@/views/articles/edit/index')
          }
        ]
      },
      {
        path: 'tags',
        name: 'Tags',
        meta: { name: '标签管理' },
        component: () => import('@/views/tags/index')
      },
      {
        path: 'categories',
        name: 'Categories',
        meta: { name: '分类管理' },
        component: () => import('@/views/categories/index')
      },
      {
        path: 'users',
        name: 'Users',
        meta: { name: '用户管理' },
        component: () => import('@/views/users/index')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
