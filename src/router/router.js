import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
import login from '../login/index.vue'
import Home from '../views/home/home'
import Welcome from '../views/welcome/welcome'
import NotFond from '../views/404/index'

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
    },
    // 路径到这里，证明没有程序去处理当前路径
    { path: '*', name: '404', component: NotFond }
  ]
})
export default router
