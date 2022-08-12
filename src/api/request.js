import axios from 'axios'
import {notify} from "@kyvg/vue3-notification";
import baseUrl from "./urls";



// 创建一个axios实例
const instance = axios.create({
  baseURL: baseUrl.testUrl,
  timeout: 60 * 1000,
  responseType: "json",
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 进行token验证
  let token = localStorage.getItem("token");
  // 如果在localStorage中没找到就去sessionStorage找
  if (!token) token = sessionStorage.getItem("token");
  if (token) {
    // console.log(token)
    config.headers.Authorization = token
  }
  return config;
},
  error => {
    notify({
      type: 'error',
      title: error
    });
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // 后端返回的错误码 参见apifox文档 “返回code码”
      switch (response.data.code) {
        case 1:
          notify({
            type: 'warn',
            title: '用户不存在'
          }); break;
        case 2:
          notify({
            type: 'warn',
            title: '密码错误'
          });break;
        case 3:
          notify({
            type: 'warn',
            title: '未知错误，请联系管理员'
          });break;
        case 4:
          notify({
            type: 'warn',
            title: '登录过期，请重新登录'
          });break;
        case 5:
          notify({
            type: 'warn',
            title: '没有相应权限'
          });break;
        case 6:
          notify({
            type: 'warn',
            title: '查询页数超出范围'
          });break;
        case 7:
          notify({
            type: 'warn',
            title: '帐号已注册'
          });break;
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }
)

// 导出
export default instance;