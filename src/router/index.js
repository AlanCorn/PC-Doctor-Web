import {createRouter, createWebHashHistory} from 'vue-router'

// 注意： 在vite脚手架中, 引入时忽略.vue扩展名将导致错误

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
                component: () => import('../components/Order.vue'),
            },
            {
                //
                path: '/order',
                name: 'Order',
                component: () => import('../components/Order.vue'),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
