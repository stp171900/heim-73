import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
import login from '../login/index.vue'
import Home from '../views/home/home'
import Welcome from '../views/welcome/welcome'
import NotFound from '../views/404/index'
import Article from '../views/article/index.vue'

Vue.use(VueRouter)

// 初始化router对象
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    // 路径到这里，证明没有程序去处理当前路径
    { path: '*', name: '404', component: NotFound }
  ]
})
router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('heim-73')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
