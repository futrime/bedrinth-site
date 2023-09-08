export default [
  {
    path: '',
    name: '公共首页',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
    meta: {
      tabName: '首页',
    },
  }
];
