import user from '../../api/order'
import baseUrl from "../../api/urls";

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
        // 用户的预约历史
        orderList:[],
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
        //             "id": 21,
        //             "name": "yzw",
        //             "contact_details": "QQ:231423",
        //             "problem_description": "45235436",
        //             "problem_category": "系统问题,流氓软件清理",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-14T19:08:39",
        //             "appointment_time": null,
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": null,
        //             "status": 0
        //         },
        //         {
        //             "id": 20,
        //             "name": "杨志文",
        //             "contact_details": "10086",
        //             "problem_description": "电脑无法启动",
        //             "problem_category": "网络，系统问题",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-14T17:03:33",
        //             "appointment_time": null,
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": null,
        //             "status": 0
        //         },
        //         {
        //             "id": 19,
        //             "name": "mdd",
        //             "contact_details": "qq:23452345",
        //             "problem_description": "测试自动生成时间2",
        //             "problem_category": "测试",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-13T16:24:04",
        //             "appointment_time": "2022-07-16T12:16:00",
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": "陈骏哲",
        //             "status": 0
        //         },
        //         {
        //             "id": 18,
        //             "name": "mdd",
        //             "contact_details": "qq:23452345",
        //             "problem_description": "测试自动生成时间",
        //             "problem_category": "测试",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-13T16:20:37",
        //             "appointment_time": "2022-07-11T12:16:00",
        //             "done_time": "2022-07-11T12:16:00",
        //             "appointment_location": null,
        //             "dianyi_name": "陈骏哲",
        //             "status": 0
        //         },
        //         {
        //             "id": 17,
        //             "name": "yzw",
        //             "contact_details": "qq:9876543",
        //             "problem_description": "寝室路由器联网",
        //             "problem_category": "网络",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-11T12:16:00",
        //             "appointment_time": "2022-07-11T12:16:00",
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": null,
        //             "status": 0
        //         },
        //         {
        //             "id": 16,
        //             "name": "submit",
        //             "contact_details": "phone:5432",
        //             "problem_description": "测试",
        //             "problem_category": "测试",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-11T12:16:00",
        //             "appointment_time": null,
        //             "done_time": null,
        //             "appointment_location": null,
        //             "dianyi_name": null,
        //             "status": 1
        //         },
        //         {
        //             "id": 15,
        //             "name": "hahaha",
        //             "contact_details": "qq:12345",
        //             "problem_description": "连不上网络",
        //             "problem_category": "网络",
        //             "problem_picture": null,
        //             "problem_video": null,
        //             "create_time": "2022-07-11T12:16:00",
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
            const urls = []
            const originUrls = state.orderFormData.problem_picture
            if (originUrls){
                originUrls.split(',').forEach((each) => {
                    // urls.push(baseUrl + '/file/' +each)
                    urls.push(`${baseUrl.testUrl}file/${each}`)
                })
            }
            return urls
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
        },
        // updateOrderFormData(content,orderFormData){
        //     content.commit('updateOrderFormData', orderFormData)
        // }
    }
}

export default order