import { createRouter, createWebHistory } from 'vue-router'
import UploadFiles from '../views/UploadFiles'
import RetrieveFiles from '../views/RetrieveFiles.vue';

const routes = [
  {
    path: '/',
    name: 'uploadFiles',
    component: RetrieveFiles
  },
  {
    path: '/retrieveFiles',
    name: 'retrieveFiles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RetrieveFiles.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
