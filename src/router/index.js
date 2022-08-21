import { createRouter, createWebHistory } from 'vue-router'
import HomeCom from '../views/HomeCom.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeCom
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
