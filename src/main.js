import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";      // vue-router
import store from "./store";        // vuex
import './style/tailwind/index.css'          // tailwind 全局样式表

// VueLoading
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// 模板通知，比Element的通知更容易改样式
import Notifications from '@kyvg/vue3-notification'
// 一个css动画库
import animate from 'animate.css'

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 编辑器组件以及样式
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism语法高亮
import Prism from 'prismjs';

VMdPreview.use(vuepressTheme, {
  Prism,
});

VMdEditor.use(vuepressTheme, {
  Prism,
});

createApp(App)
  .use(VueLoading)
  .use(animate)
  .use(store)
  .use(router)
  .use(Notifications)
  .use(VMdPreview)
  .use(VMdEditor)
  .mount('#app')
