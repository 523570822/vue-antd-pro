import { AppLayout, ViewLayout } from '@/components/Layout'

const otherRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/auth/login')
  },
  {
    path: '/error',
    name: 'error',
    redirect: '404',
    component: ViewLayout,
    children: [
      {
        path: '404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "404" */ '@/views/error/404')
      }
    ]
  }
]
export const menuZj = [
  {
    path: 'student',
    name: 'student',
    title: '学员信息',
    icon: 'table',
    meta: {
      title: '学员信息',
      icon: 'table'
    },
    component: () => import(/* we5438284601153252packChunkName: "table" */ '@/views/student/student')
  }
/*  ,
  {
    path: 'table',
    name: 'table',
    title: '表格页122',
    icon: 'table',
    meta: {
      title: '表格页122',
      icon: 'table'
    },
    component: () => import(/!* webpackChunkName: "table" *!/ '@/views/table/table')
  }
  , {
    path: 'dashboard',
    name: 'dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard'
    },
    component: ViewLayout,
    children: [
      {
        path: 'analysis',
        name: 'dashboard_analysis',
        title: '分析页',
        meta: {
          title: '分析页'
        },
        component: () => import(/!* webpackChunkName: "analysis" *!/ '@/views/dashboard/analysis')
      },
      {
        path: 'monitor',
        name: 'dashboard_monitor',
        title: '监控页',

        meta: {
          title: '监控页'
        },
        component: () => import(/!* webpackChunkName: "monitor" *!/ '@/views/dashboard/monitor')
      }
    ]
  } */
]
export const appRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/student',
    component: AppLayout,
    children: menuZj
  }
]

const routes = [...otherRoutes, ...appRoutes]

export default routes
