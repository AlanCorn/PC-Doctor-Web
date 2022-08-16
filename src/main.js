import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";      // vue-router
import store from "./store";        // vuex
import './index.css'                // tailwind 全局样式表
// ElementPlus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
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

// highlightjs
import hljs from 'highlight.js';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
    Hljs: hljs,
});

VMdEditor.use(vuepressTheme, {
    Hljs: hljs,
});

createApp(App)
    .use(ElementPlus)
    .use(animate)
    .use(store)
    .use(router)
    .use(Notifications)
    .use(VMdPreview)
    .use(VMdEditor)
    .mount('#app')
