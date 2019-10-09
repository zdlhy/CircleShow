import Vue from 'vue'
import Router from 'vue-router'
import Login from 'src/components/login'
import Home from 'view/wecircle/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('view/publish')
    }
  ]
})
