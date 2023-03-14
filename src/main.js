import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'
import 'mint-ui/lib/style.css'
import './mock/MockServer'  // 加载这个模块即可

Vue.use(VueLazyload, { // 内部会定义一个全局的指令: lazy
  loading
})
// 注册全局组件标签
Vue.component(Button.name,Button)

Vue.config.productionTip = false


 const vm=new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

console.log(vm)