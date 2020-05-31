import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
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
        component: () => import('@/views/articles/index')
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/tags/index')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/categories/index')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users/index')
      },
      {
        path: 'articles/edit',
        name: 'Edit',
        component: () => import('@/views/articles/edit/index')
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
