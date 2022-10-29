import userApi from '../../api/userApi'
import { notify } from "@kyvg/vue3-notification";
import { reactive } from "vue";

const user = {
  state: () => ({
    isLogin: false,
    user_name: "",
    user_id: "",
    sex: '',
    level: "",
    contact_details: "",
    sessionId: "",
    user_description: "",
    user_picture: "",
    filterParams: {
      cate: 0,   // 默认状态为 0 ：全部， 1：排队中 ,2:正在处理 3:已完成
      page: 1,
      isOnlyShowMine: false
    }
  }),
  getters: {
    getUserInfo(state) {
      return {
        user_id: state.user_id,
        user_name: state.user_name,
        sex: state.sex,
        level: state.level,
        contact_details: state.contact_details,
        user_description: state.user_description,
        user_picture: state.user_picture
      }
    }
  },
  mutations: {
    // 整体修改筛选参数
    setFilterParams(state, data) {
      state.filterParams = data
    },
    // 页数重置为1
    setFilterParamsFirstPage(state) {
      state.filterParams.page = 1
    },
    // 页数+1
    setFilterParamsNextPage(state) {
      state.filterParams.page += 1
    },
    setToken(state) {
      let sessionId = localStorage.getItem("token");
      // 如果在localStorage中没找到就去sessionStorage找
      if (!sessionId) sessionId = sessionStorage.getItem("token");
      if (sessionId) {
        state.sessionId = sessionId
        state.isLogin = true
      }
    },
    offToken(state) {
      localStorage.clear()
      sessionStorage.clear()
      state.sessionId = ""
      state.isLogin = false
    }
  },
  actions: {
    updateState(content) {
      content.commit('setToken')
      // @todo 登录过期异常处理
      if (content.state.sessionId !== "") {
        return new Promise((resolve, reject) => {
          userApi.queryUser().then(res => {
            if (res.data.code === 0) {
              content.state.user_name = res.data.user_info.user_name
              content.state.user_id = res.data.user_info.user_id
              content.state.sex = res.data.user_info.sex
              content.state.level = res.data.user_info.level
              content.state.contact_details = res.data.user_info.contact_details
              content.state.user_description = res.data.user_info.user_description,
                content.state.user_picture = res.data.user_info.user_picture
            } else if (res.data.code === 4) {
              content.commit('offToken')
            } else if (res.data.code === 8) {
              content.commit('offToken')
            }
            resolve(res)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        })
      }
    }
  }
}

export default user