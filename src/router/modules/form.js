/*
 * @Description:
 * @Date: 2022-06-13 10:55:27
 * @LastEditTime: 2022-06-13 11:02:48
 */
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: { title: 'Form', icon: 'form' }
    }
  ]
}
export default formRouter
