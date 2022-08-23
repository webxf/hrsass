import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  name:'permission',

  meta: {
    id: 'permissions', // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      name:'permission',
      meta: { title: '权限管理', icon: 'lock' },
    },
  ],
}
