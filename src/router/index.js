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
                meta: { title: "电脑医院-首页" },
                component: () => import('../views/Order/Order.vue'),
            },
            {
                // 预约页面
                path: '/addOrder',
                name: 'AddOrder',
                meta: { title: "电脑医院-添加预约" },
                component: () => import('../views/Order/OrderAdd.vue'),
            },
            {
                // 预约页面
                path: '/orderInfo',
                name: 'OrderInfo',
                meta: { title: "电脑医院-预约信息" },
                component: () => import('../views/Order/OrderInfo.vue'),
            },
            {
                // 文档页面
                path: '/document',
                name: 'Document',
                meta: { title: "电脑医院-文档" },
                component: () => import('../views/Document.vue'),
            },
            {
                // 关于我们
                path: '/about',
                name: 'About',
                meta: { title: "电脑医院-关于我们" },
                component:() => import('../views/AboutUs.vue')
            },
            {
                // 意见
                path: '/suggestion',
                name: 'Suggestion',
                meta: { title: "电脑医院-意见" },
                component:() => import('../views/Suggestion.vue')
            },
            {
                // 帮助
                path: '/help',
                name: 'Help',
                meta: { title: "电脑医院-帮助" },
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

//todo 全局路由守卫，内部做一些登录验证处理
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
    //添加标题
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})


export default router
