import Vue from 'vue'
import App from './App.vue'
// 导包
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入router
import router from './router/router'
import axios from '../src/api/axios'
Vue.prototype.$ajax = axios

// 全局注册
Vue.use(ElementUI)
Vue.config.productionTip = false

// 职责1：依赖项目需要的资源（js模块 css资源 ...）
// 职责2：实例化根实例  render() 渲染APP组件   然后挂载到#app的容器内
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
