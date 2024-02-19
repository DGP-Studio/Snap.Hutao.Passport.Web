export default {
  path: '/userinfo',
  name: 'userinfo',
  component: () => import('@/views/userinfo/index.vue'),
  meta: {
    locale: 'menu.userinfo',
    icon: 'icon-user',
    requiresAuth: true,
    order: 0,
  },
}