import userApi from '../../api/userApi'
import {notify} from "@kyvg/vue3-notification";
import user from "../../api/userApi";

const admin = {
    state: () => ({
        // 电医在管理员主页所看到的orderList
        adminOrderList:{
            // 正在处理的预约
            processingList:[],
            processingListSize:0,
            // 排队中的的预约
            waitingList:[],
            waitingListSize:0,
            // 已完成的预约
            finishedList:[],
            finishedListSize:0,
        }
    }),
    getters: {
        adminOrderListGetter: (state) => (type) => {
            switch (type){
                case '正在处理':
                    return state.adminOrderList.processingList
                case '待接单':
                    return state.adminOrderList.waitingList
                case '已完成':
                    return state.adminOrderList.finishedList
            }
        }
    },
    mutations: {
        setProcessingList(state, data){
            state.adminOrderList.processingList = data.list
            state.adminOrderList.processingListSize = data.size
        },
        setWaitingList(state, data){
            state.adminOrderList.waitingList = data.list
            state.adminOrderList.waitingListSize = data.size
        },
        setFinishedList(state, data){
            state.adminOrderList.finishedList = data.list
            state.adminOrderList.finishedListSize = data.size
        },
    },
    actions: {
        // 参数说明: @params=发送/query请求的参数     @listType=对应三个列表的mutations
        // 获取电医管理的三个列表
        getAdminOrderList(content,data){
            // 使用user Api 发送异步请求，提交commit
            user.getOrderHistory(data.params).then(res =>{
                content.commit(data.type, {
                    list : res.data.appointment_list,
                    size : res.data.size
                })
            }).catch(err =>{
                console.log(err)
            })
        },
    }
}

export default admin