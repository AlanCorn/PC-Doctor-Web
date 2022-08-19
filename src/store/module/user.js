import userApi from '../../api/userApi'
import { notify } from "@kyvg/vue3-notification";

const user = {
    state: () => ({
        isLogin:false,
        user_name:"",
        user_id:"",
        level:"",
        contact_details:"",
        sessionId:""
    }),
    getters:{
        getUserInfo(state) {
            return {
                user_id:state.user_id,
                user_name:state.user_name,
                level:state.level,
                contact_details:state.contact_details
            }
        }
    },
    mutations:{
        setToken(state){
            let sessionId = localStorage.getItem("token");
            // 如果在localStorage中没找到就去sessionStorage找
            if (!sessionId) sessionId = sessionStorage.getItem("token");
            if (sessionId) {
                state.sessionId = sessionId
                state.isLogin = true
            }
        },
        offToken(state){
            localStorage.clear()
            sessionStorage.clear()
            state.sessionId = ""
            state.isLogin = false
        }
    },
    actions:{
        updateState(content){
            content.commit('setToken')
            // @todo 登录过期异常处理
            if (content.state.sessionId !== ""){
                return new Promise((resolve,reject) => {
                    userApi.queryUser().then(res => {
                        if (res.data.code === 0) {
                            content.state.user_name = res.data.user_info.user_name
                            content.state.user_id = res.data.user_info.user_id
                            content.state.level = res.data.user_info.level
                            content.state.contact_details = res.data.user_info.contact_details
                        }else if (res.data.code === 4) {
                            content.commit('offToken')
                        }
                        resolve(res)
                    }).catch(err => {
                        console.log(err)
                        reject(err)
                    })
                } )
            }
        }
    }
}

export default user