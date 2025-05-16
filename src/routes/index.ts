import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
      path: '/',
      name: 'home',
      component: () => import('../view/Home/index.vue')
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('../view/Demo1/index.vue')
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import('../view/Demo2/index.vue')
  },
  //{
      //配置404页面
      //path: '/:catchAll(.*)',
      //name: '404',
      //component: () => import(''),
  //}
];
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes
})
// 导出
export default router 
