import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/MainLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import ReportPage from '@/pages/ReportPage.vue'
import EmployeePage from '@/pages/EmployeePage.vue'
import SettingPage from '@/pages/SettingPage.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'reports',
        component: ReportPage
      },
      {
        path: 'employees',
        component: EmployeePage
      },
      {
        path: 'settings',
        component: SettingPage
      }
    ]
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
