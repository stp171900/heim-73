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

// 註冊全局的前置守衛
router.beforeEach((to, from, next) => {
  // 如果不主動觸發， resove  一直等待
  // console.log('ok')
  // 如果是登錄頁 放行   to.path將要跳轉的路徑
  // if (to.path === '/login') return next()
  // 判斷登錄狀態
  const user = window.sessionStorage.getItem('heim-73')
  if (to.path !== '/login' && user) {
    next()
  } else {
    next('/login')
  }
})
export default router
