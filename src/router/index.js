import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页仪表盘', icon: 'mdi-view-dashboard-outline' }
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: '/class/record',
    name: 'Class',
    meta: { title: '课时管理', icon: 'mdi-calendar-clock-outline' },
    children: [
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/class/Record.vue'),
        meta: { title: '课时记录', icon: 'mdi-clipboard-text-clock-outline' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/student',
    name: 'User',
    meta: { title: '用户管理', icon: 'mdi-account-group-outline' },
    children: [
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/user/Student.vue'),
        meta: { title: '学生管理', icon: 'mdi-school-outline' }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/user/Teacher.vue'),
        meta: { title: '教师管理', icon: 'mdi-account-tie-outline' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
