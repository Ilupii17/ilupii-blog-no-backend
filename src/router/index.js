import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WriteUpView from '../views/WriteUpView.vue'
import ProjectView from '../views/ProjectView.vue'
import PostView from '../views/postView.vue' // Tambahin ini

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/writeup',
    name: 'writeup',
    component: WriteUpView
  },
  {
    path: '/project',
    name: 'project',
    component: ProjectView
  },
  {
    path: '/post/:slug', // Tambahin route buat detail post
    name: 'post',
    component: PostView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router