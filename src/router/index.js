import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'Views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ 'Views/Auth')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'Views/Dashboard.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ 'Views/Admin.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "create" */ 'Views/Create.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
