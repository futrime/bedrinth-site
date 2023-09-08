export default [
    {
      path: '',
      name: '登录页',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Login/Login.vue'),
      meta: {
        tabName: '登录',
      },
    },
    {
      path: 'register',
      name: '注册页',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Login/Register.vue'),
      meta: {
        tabName: '注册',
      },
    }
  ];
  