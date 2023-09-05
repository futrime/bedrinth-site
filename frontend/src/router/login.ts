export default [
    {
      path: '',
      name: '登录页',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Login/Login.vue'),
      meta: {
        title: '登录',
        tabName: '登录',
      },
    },
    {
      path: 'register',
      name: '注册页',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Login/Register.vue'),
      meta: {
        title: '注册',
        tabName: '注册',
      },
    }
  ];
  