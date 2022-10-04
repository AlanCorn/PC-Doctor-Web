import userApi from '../../api/userApi'
import {notify} from "@kyvg/vue3-notification";
import adminApi from "../../api/adminApi";

const admin = {
    state: () => ({
        // 电医在管理员主页所看到的orderList
        adminOrderList: {
            // 正在处理的预约
            processingList: [],
            processingListSize: 0,
            // 排队中的的预约
            waitingList: [],
            waitingListSize: 0,
            // 已完成的预约
            finishedList: [],
            finishedListSize: 0,
        },
        // 用户管理下的列表
        userList: {
            list: [],
            size: 0
        },
        // 通知群号
        informGroupID:''
    }),
    getters: {
        adminOrderListGetter: (state) => (type) => {
            switch (type) {
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
        setProcessingList(state, data) {
            state.adminOrderList.processingList = data.list
            state.adminOrderList.processingListSize = data.size
        },
        setWaitingList(state, data) {
            state.adminOrderList.waitingList = data.list
            state.adminOrderList.waitingListSize = data.size
        },
        setFinishedList(state, data) {
            state.adminOrderList.finishedList = data.list
            state.adminOrderList.finishedListSize = data.size
        },
        setUserList(state, data) {
            state.userList.list = data.list
            state.userList.size = data.size
        },
        setInformGroupID(state, groupID) {
            state.informGroupID = groupID
        },
    },
    actions: {
        // 获取电医管理的三个列表
        /** @params=发送/query请求的参数
         * @listType=对应三个列表的mutations
         * */
        getAdminOrderList(content, data) {
            // 使用user Api 发送异步请求，提交commit
            userApi.getOrderHistory(data.params).then(res => {
                if (res.data.code === 0){
                    content.commit(data.type, {
                        list: res.data.appointment_list,
                        size: res.data.size
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取用户列表，管理员(2)进行用户管理
        getUserList(content, params) {
            return new Promise((resolve, reject) => {
                adminApi.getUserList(params).then(res => {
                    if (res.data.code === 0){
                        content.commit('setUserList', {
                            list: res.data.user_list,
                            size: res.data.size
                        })
                        resolve(res)
                    }
                    reject('error')
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //
        getInformGroupID(content) {
            adminApi.queryInformGroupID().then(res => {
                if (res.data.code === 0){
                    content.commit('setInformGroupID', res.data.group)
                }
            }).catch(err => {
                console.log(err)
            })
        },
    }
}

export default admin