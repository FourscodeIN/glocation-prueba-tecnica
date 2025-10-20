import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProyectosView from '../views/ProyectosView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/proyectos', name: 'proyectos', component: ProyectosView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
