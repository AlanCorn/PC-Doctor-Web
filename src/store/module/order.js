import user from '../../api/order'

const order = {
    state: () => ({
        // 问题分类
        cateList: [
            '联网问题',
            '系统问题',
            '电脑清灰',
            '重装系统',
            '病毒扫描',
            '流氓软件清理',
        ],
        // 用户的预约历史
        orderList:[]
        // orderList: [
        //     {
        //         problem:"电脑无法启动",
        //         cate:['系统重装','拆机清灰'],
        //         orderTime:'时间戳',
        //         orderLocation:'师生之家',
        //         status:'已完成',
        //         pick:['']
        //     }, {
        //         problem:"电脑无法启动",
        //         cate:['系统重装','拆机清灰'],
        //         orderTime:'时间戳',
        //         orderLocation:'师生之家',
        //         status:'待接单',
        //         pick:['']
        //     },{
        //         problem:"电脑无法启动",
        //         cate:['系统重装','拆机清灰'],
        //         orderTime:'时间戳',
        //         orderLocation:'师生之家',
        //         status:'正在维修',
        //         pick:['']
        //     },{
        //         problem:"电脑无法启动",
        //         cate:['系统重装','拆机清灰'],
        //         orderTime:'时间戳',
        //         orderLocation:'师生之家',
        //         status:'正在维修',
        //         pick:['']
        //     }],
    }),
    getters:{
        // 指定条件过滤列表
        filterOrderList(state){

        }
    },
    mutations:{
        setCateList(state,cateList){
            state.cateList = cateList
        },
        setOrderList(state,orderList){
            state.orderList = orderList
        }
    },
    actions:{
        getUserOrderList(content,params){
            // 使用user Api 发送异步请求，提交commit
            user.getOrderHistory(params).then(res =>{
                    console.log(res.data)
                    content.commit('setOrderList', res.data)
                }
            ).catch(err =>{
                console.log(err)
            })
        }
    }
}

export default order