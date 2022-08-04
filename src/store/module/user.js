import userApi from '../../api/userApi'

const user = {
    state: () => ({
        isLogin:false,
        user_name:"",
        user_id:"",
        level:"",
        contact_details:"",
        sessionId:""
    }),
    getters:{},
    mutations:{
        setToken(state){
            let sessionId = localStorage.getItem("token");
            // 如果在localStorage中没找到就去sessionStorage找
            if (!sessionId) sessionId = sessionStorage.getItem("token");
            console.log("vuex读取本地sessionId",sessionId)
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
            if (content.state.sessionId !== ""){
                userApi.queryUser().then(res => {
                    if (res.data !== "FAIL") {
                        content.state.user_name = res.data.user_name
                        content.state.user_id = res.data.user_id
                        content.state.level = res.data.level
                        content.state.contact_details = res.data.contact_details
                    }
                })
            }
        }
    }
}

export default user