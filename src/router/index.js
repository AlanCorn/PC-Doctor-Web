import {createRouter, createWebHistory} from 'vue-router'
import {notify} from "@kyvg/vue3-notification";
import {myStore} from '@/store'

import {useLoading} from 'vue-loading-overlay'

// 路由加载动画
const $loading = useLoading()
let loader = null;
let loaderTimer = null
function hideLoader(){
    if(loader) {
        loader.hide();
        loader = null;
    }
}

function showLoader(){
    hideLoader();
    loader = $loading.show({
        container:null,
        loader: 'bars',
        color: '#3C83F6',
    })
}

const store = myStore();
// @@@ 注意： 在vite脚手架中, 引入时忽略.vue扩展名将导致错误

const routes = [
    {
        path: '/',              //链接路径
        name: 'Index',          //路由名称，
        component: () => import('../views/index.vue'),
        // 重定向到预约页面(首页)
        redirect: to => {
            return {path: '/order'}
        },
        children: [
            // 登录页面
            {
                path: '/login',
                name: 'Login',
                meta: {title: "电脑医院-登录"},
                component: () => import('../views/User/Login.vue')
            },
            // 注册页面
            {
                path: '/register',
                name: 'Register',
                meta: {title: "电脑医院-注册"},
                component: () => import('../views/User/Register.vue')
            },

            // 首页
            {

                path: '/order',
                name: 'Order',
                meta: {
                    title: "电脑医院-首页",
                    group:'Order'
                },
                component: () => import('../views/Order/Order.vue'),
            },
            // 预约页面
            {
                path: '/addOrder',
                name: 'AddOrder',
                meta: {
                    title: "电脑医院-添加预约",
                    reqLogin: true
                },
                component: () => import('../views/Order/OrderAdd.vue'),
            },
            // 预约信息页面
            {
                path: '/orderInfo',
                name: 'OrderInfo',
                meta: {
                    title: "电脑医院-预约信息",
                    reqLogin: true
                },
                component: () => import('../views/Order/OrderInfo.vue'),
                beforeEnter: (to, from, next) => {
                    // 获取预约信息
                    store.dispatch('getOrderFormData', to.query.id).then(res => {
                        next()
                    }).catch(err => {
                        return false
                    })
                }
            },
            // 文档页面
            {
                path: '/document',
                name: 'Document',
                meta: {
                    title: "电脑医院-文档",
                    group:'Document'
                },
                component: () => import('../views/Document/Document.vue'),
            },
            // 个人空间
            {
                path: '/space',
                name: 'Space',
                meta: {
                    title: "电脑医院-我的",
                    group:'Space',
                    reqLogin: true
                },
                component: () => import('../views/User/Space.vue'),
                redirect: to => {
                    return {path: '/profile'}
                },
                children:[
                    // 面板
                    {
                        path: '/dashboard',
                        name: 'Dashboard',
                        meta: {title: "电脑医院-个人空间"},
                        component: () => import('../views/User/SpaceDashBoard.vue')
                    },
                    // 个人信息
                    {
                        path: '/profile',
                        name: 'Profile',
                        meta: {title: "电脑医院-个人信息"},
                        component: () => import('../views/User/InfoEdit.vue')
                    },
                    // 修改密码页面
                    {
                        path: '/resetPwd',
                        name: 'ResetPwd',
                        meta: {title: "电脑医院-修改密码"},
                        component: () => import('../views/User/ResetPwd.vue')
                    },
                    // 管理员
                    // 问题类别管理
                    {
                        path: '/adminGeneral',
                        name: 'AdminGeneral',
                        meta: {
                            title: "电脑医院-管理员-问题类别",
                            reqAdmin: true,
                            reqLogin: true
                        },
                        component: () => import('../views/Admin/AdminGeneral.vue'),
                    },
                    // 电医管理
                    {
                        path: '/adminDoctorMng',
                        name: 'AdminDoctorMng',
                        meta: {
                            title: "电脑医院-管理员-电医管理",
                            reqAdmin: true,
                            reqLogin: true
                        },
                        component: () => import('../views/Admin/AdminDoctorMng.vue'),
                    },
                    // 用户管理
                    {
                        path: '/adminUserMng',
                        name: 'AdminUserMng',
                        meta: {
                            title: "电脑医院-管理员-用户管理",
                            reqAdmin: true,
                            reqLogin: true
                        },
                        component: () => import('../views/Admin/AdminUserMng.vue'),
                    },
                ]
            },
            // 文档浏览/文档预览
            {
                path: '/preview',
                name: 'Preview',
                meta: {title: "电脑医院-文档"},
                component: () => import('../views/Document/DocumentPreview.vue'),
            },
            // 文档编辑
            {
                path: '/edit',
                name: 'Edit',
                meta: {
                    title: "电脑医院-文档",
                    reqAdmin: true,
                    reqLogin: true
                },
                component: () => import('../views/Document/DocumentEdit.vue'),
            },
            // 关于我们
            {

                path: '/about',
                name: 'About',
                meta: {
                    title: "电脑医院-关于我们",
                    group: "Space"
                },
                component: () => import('../views/AboutUs.vue')
            },
            // 意见
            {
                path: '/suggestion',
                name: 'Suggestion',
                meta: {
                    title: "电脑医院-意见",
                    reqLogin: true
                },
                component: () => import('../views/Suggestion.vue')
            },
            // 帮助
            {
                path: '/help',
                name: 'Help',
                meta: {title: "电脑医院-帮助"},
                component: () => import('../views/Help.vue')
            }
        ]
    },
]

const router = createRouter({
    // history: createWebHashHistory(),     // url中带井号
    history: createWebHistory(),            // url中不带井号
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
})

//todo 全局路由守卫，内部做一些登录验证处理
router.beforeEach((to, from, next) => {
    showLoader()
    // 再次检验登录
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.reqLogin) {
        store.dispatch('updateState').then(res => {
            if (store.state.user.isLogin === false) {
                next({name: 'Login'})
                if (to.meta.title === "电脑医院-添加预约") {
                    notify({
                        title: "提示",
                        text: "预约需要登录"
                    })
                } else {
                    notify({
                        title: "提示",
                        text: "该功能需要登录"
                    })
                }
            } else if (to.meta.reqAdmin && store.state.user.level === '0') {
                next({name: 'Index'})
                notify({
                    title: "提示",
                    text: "您不具备管理员权限"
                })
            } else next()
        })
    } else next()
})

router.afterEach((to, from) => {
    hideLoader()
})

export default router
