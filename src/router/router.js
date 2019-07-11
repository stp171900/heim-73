import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
import login from '../login/index.vue'
import Home from '../views/home/home'
import Welcome from '../views/welcome/welcome'

Vue.use(VueRouter)

// 初始化router对象
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
  ]
})
export default router
