import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: () => import('../views/NavView.vue'),
    children: [{
      path: '/home',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue'),
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
