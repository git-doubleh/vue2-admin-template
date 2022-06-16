/*
 * @Description:
 * @Date: 2022-06-13 10:55:27
 * @LastEditTime: 2022-06-16 11:09:09
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const exampleRouter = {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: 'Table', icon: 'table' }
    },
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('@/views/editor/index'),
      meta: { title: 'Editor', icon: 'tree' }
    }
  ]
}

export default exampleRouter
