import user from '../../api/userApi'
import { getOnlineImageUrl } from "../../utils";
// 预约订单相关的状态，

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
        // 当前的预约表单信息(预约详情)
        orderFormData:{},
        orderStatusMessage:[],
        // 用户的预约历史
        orderList:[],
        // 总长度，做分页浏览的时候有用
        orderListSize:0,
        // orderList: [
        //     {
        //         "id": 23,
        //         "name": "杨志文",
        //         "contact_details": "WeChat:AlanOvO",
        //         "problem_description": "测试一下表单提交，文件上传，以及长文本显示效果，测试一下表单提交，文件上传，以及长文本显示效果测试一下表单提交，文件上传，以及长文本显示效果测试一下表单提交，文件上传，以及长文本显示效果测试一下表单提交，文件上传，以及长文本显示效果测试一下表单提交，文件上传，以及长文本显示效果",
        //         "problem_category": "联网问题,系统问题,电脑清灰,重装系统,病毒扫描,流氓软件清理",
        //         "problem_picture": "16578001992613125826_anime-glasses-anime-girl-glasses-reading-hd-png.png,16578002071081200x630wa-removebg.png",
        //         "problem_video": null,
        //         "create_time": "2022-07-14T20:03:27",
        //         "appointment_time": null,
        //         "done_time": null,
        //         "appointment_location": null,
        //         "dianyi_name": null,
        //         "status": 0
        //     },
        //         {
        //             "id": 22,
        //             "name": "yzw",
        //             "contact_details": "QQ:231423",
        //             "problem_description": "45235436",
        //             "problem_category": "系统问题,流氓软件清理",
        //             "problem_picture": "1657796928859(64px)386451_arch linux_archlinux_icon (1).png",
        //             "problem_video": null,
        //             "create_time": "2022-07-14T19:08:53",
        //             "appointment_time": null,
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": null,
        //             "status": 0
        //         },
        //         {
        //             "id": 14,
        //             "name": "name13",
        //             "contact_details": "contact13",
        //             "problem_description": "description13",
        //             "problem_category": "category13",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-11T12:16:00",
        //             "appointment_time": null,
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": null,
        //             "status": 0
        //         }
        //     ]
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
        }
    },
    mutations:{
        setCateList(state,cateList){
            state.cateList = cateList
        },
        setOrderFormData(state,orderFormData){
            console.log(orderFormData)
            state.orderFormData = orderFormData
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
            user.getOrderHistory(params).then(res =>{
                content.commit('setOrderList', res.data.appointment_list)
                content.commit('setOrderSize', res.data.size)
            }).catch(err =>{
                console.log(err)
            })
        },
        getOrderStatusMessage(content,appointment_id){
            user.getOrderStatusMessage(appointment_id).then(res =>{
                    content.commit('setOrderStatusMessage', res.data)
                    console.log("查询状态消息",res.data)
                }
            ).catch(err =>{
                console.log(err)
            })
        }
        // updateOrderFormData(content,orderFormData){
        //     content.commit('updateOrderFormData', orderFormData)
        // }
    }
}

export default order