import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatientAdd from '../views/PatientAdd.vue'
import PatientView from '../views/PatientView.vue'
import DoctorAdd from '../views/DoctorAdd.vue'
import DoctorView from '../views/DoctorView.vue'
import AptAdd from '../views/AptAdd.vue'
import AptView from '../views/AptView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserView from '../views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/userView',
      name: 'userView',
      component: UserView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/PatientAdd',
      name: 'PatientAdd',
      component: PatientAdd
    },
    {
      path: '/PatientView',
      name: 'PatientView',
      component: PatientView
    },
    {
      path: '/DocAdd',
      name: 'DocAdd',
      component: DoctorAdd
    },
    {
      path: '/DocView',
      name: 'DocView',
      component: DoctorView
    },
    {
      path: '/AptAdd',
      name: 'AptAdd',
      component: AptAdd
    },
    {
      path: '/AptView',
      name: 'AptView',
      component: AptView
    }
  ]
})

export default router
