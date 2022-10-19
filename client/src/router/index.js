import { createRouter, createWebHistory } from 'vue-router'
import UploadFiles from '../views/UploadFiles'
import RetrieveFiles from '../views/RetrieveFiles.vue';

const routes = [
  {
    path: '/',
    name: 'Upload Files',
    component: UploadFiles
  },
  // {
  //   path: '/retrieveFiles',
  //   name: 'retrieveFiles',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/RetrieveFiles.vue')
  // },
  {
    path: '/retrieveFiles',
    name: 'Retrieve Files',
    component: RetrieveFiles
  },
  // catch all 404
  // {
  //   path: '/:catchAll(.*)',
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next)=>{
  console.log('From');
  console.log(from);
  console.log('To');
  console.log(to);
  
  document.title = `${process.env.VUE_APP_TITLE } - ${to.name}`
  next();
});

export default router;
