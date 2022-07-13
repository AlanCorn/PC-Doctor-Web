import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";      // vue-router
import store from "./store";        // vuex
import './index.css'                // tailwind 全局样式表
// ElementPlus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Notifications from '@kyvg/vue3-notification'

createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .use(Notifications)
    .mount('#app')
