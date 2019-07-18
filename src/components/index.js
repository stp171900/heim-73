import MyBread from './my-bread.vue'
import MyChannel from './my-channel.vue'

// 封装成插件的形式 Vue.use(插件) 执行插件的配置对象中install函数 且传入Vue对象
export default {
  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
