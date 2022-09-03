import userApi from '../../api/userApi'
import { getOnlineImageUrl } from "../../utils";
// 预约订单相关的状态，

const order = {
    state: () => ({
        // 问题分类
        cateList: [],
        // 当前的预约表单信息(预约详情)
        orderFormData:{},
        // 接单电医信息
        orderDoctorInfo:{},
        orderStatusMessage:[],
        // 用户的预约历史
        orderList:[],
        // 总长度，做分页浏览的时候有用
        orderListSize:0,

        isOrderListLoaded:false
    }),
    getters:{
        // 指定条件过滤列表
        filterOrderList(state){

        },
        // orderList是否加载完成
        isOrderListLoaded(state){
            return state.isOrderListLoaded === true || state.orderList.length > 0;
        },
        getOrderFormDataImagesUrls(state){
            const originUrls = state.orderFormData.problem_picture
            return getOnlineImageUrl(originUrls)
        },
        //
        getFmtCateList(state){
            return state.cateList.map((each) => each.category)
        }
    },
    mutations:{
        setCateList(state,cateList){
            state.cateList = cateList
        },
        setOrderFormData(state,orderFormData){
            state.orderFormData = orderFormData
        },
        setOrderDoctor(state,doctorInfo){
            state.orderDoctorInfo = doctorInfo
        },
        setOrderList(state,orderList){
            state.orderList = orderList
            state.isOrderListLoaded = true
        },
        setOrderSize(state,num){
            state.orderListSize = num
        },
        setOrderStatusMessage(state,statusMessage){
            state.orderStatusMessage = statusMessage
        }
    },
    actions:{
        getUserOrderList(content,params){
            // 使用user Api 发送异步请求，提交commit
            userApi.getOrderHistory(params).then(res =>{
                content.commit('setOrderList', res.data.appointment_list)
                content.commit('setOrderSize', res.data.size)
            }).catch(err =>{
                console.log(err)
            })
        },
        // 查询表单
        getOrderFormData(content,orderId){
            // 使用user Api 发送异步请求，提交commit
            userApi.getOrderHistory({
                page:1,
                id:orderId
            }).then(res =>{
                if (res.data.code === 0){
                    content.commit('setOrderFormData', res.data.appointment_list[0])
                    // 查询接单电医信息，放到orderDoctorInfo
                    content.dispatch('getUserOrderDoctor',res.data.appointment_list[0].doctor_id)
                }
            }).catch(err =>{
                console.log(err)
            })
        },
        // 查询接单电医信息
        getUserOrderDoctor(content,doctor_id){
            // 使用user Api 发送异步请求，提交commit
            userApi.getDoctorInfo({
                page:1,
                user_id:doctor_id
            }).then(res =>{
                if (res.data.code === 0){
                    content.commit('setOrderDoctor', res.data.user_list[0])
                }
            }).catch(err =>{
                console.log(err)
            })
        },
        getOrderStatusMessage(content,appointment_id){
            userApi.getOrderStatusMessage(appointment_id).then(res =>{
                    content.commit('setOrderStatusMessage', res.data)
                }
            ).catch(err =>{
                console.log(err)
            })
        },
        // 查询问题类型
        getProblemCate(content) {
            return new Promise((resolve,reject) => {
                userApi.getProblemCate().then(res => {
                    if (res.data.code === 0) {
                        // 提交
                        content.commit('setCateList',res.data.list)
                        resolve(res)
                    }
                    reject(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
        // updateOrderFormData(content,orderFormData){
        //     content.commit('updateOrderFormData', orderFormData)
        // }
    }
}

export default order