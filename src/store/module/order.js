const order = {
    state: () => ({
        // 用户的预约历史
        orderList: [
            {
                problem:"电脑无法启动",
                cate:['系统重装','拆机清灰'],
                orderTime:'时间戳',
                orderLocation:'师生之家',
                status:'已完成',
                pick:['']
            }, {
                problem:"电脑无法启动",
                cate:['系统重装','拆机清灰'],
                orderTime:'时间戳',
                orderLocation:'师生之家',
                status:'待接单',
                pick:['']
            },{
                problem:"电脑无法启动",
                cate:['系统重装','拆机清灰'],
                orderTime:'时间戳',
                orderLocation:'师生之家',
                status:'正在维修',
                pick:['']
            },{
                problem:"电脑无法启动",
                cate:['系统重装','拆机清灰'],
                orderTime:'时间戳',
                orderLocation:'师生之家',
                status:'正在维修',
                pick:['']
            }],
    }),
    getters:{
        // 指定条件过滤列表
        filterOrderList(state, payload){

        }
    },
    mutations:{

    },
    actions:{

    }
}

export default order