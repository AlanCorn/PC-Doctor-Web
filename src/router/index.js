import {createRouter, createWebHistory} from 'vue-router'

// @@@ 注意： 在vite脚手架中, 引入时忽略.vue扩展名将导致错误

const routes = [
    {
        path: '/',              //链接路径
        name: 'Index',          //路由名称，
        component:  () => import('../views/index.vue'),
        // 重定向到预约页面(首页)
        redirect: to => {
            return {path: '/order'}
        },
        children: [
            {
                // 预约页面
                path: '/order',
                name: 'Order',
                component: () => import('../views/Order.vue'),
            },
            {
                // 文档页面
                path: '/document',
                name: 'Document',
                component: () => import('../views/Document.vue'),
            },
            {
                // 关于我们
                path: '/about',
                name: 'About',
                component:() => import('../views/AboutUs.vue')
            },
            {
                // 意见
                path: '/suggestion',
                name: 'Suggestion',
                component:() => import('../views/Suggestion.vue')
            },
            {
                // 帮助
                path: '/help',
                name: 'Help',
                component:() => import('../views/Help.vue')
            }
        ]
    }
]

const router = createRouter({
    // history: createWebHashHistory(),     // url中带井号
    history: createWebHistory(),            // url中不带井号
    routes
})

export default router
