import axios from 'axios'
import { ElMessage } from "element-plus";
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
    config.headers.Authorization = token
  }
  return config;
},
  error => {
    ElMessage({
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // 后端返回的错误码
      // switch (response.data.code) {
      //   case 4000:
      //     ElMessage({
      //       message: "处理失败",
      //       type: "warning"
      //     }); break;
      //   case 4004:
      //     ElMessage({
      //       message: "登录失败",
      //       type: "warning"
      //     }); break;
      //   case 5000:
      //     ElMessage({
      //       message: "参数错误",
      //       type: "warning"
      //     }); break;
      //   case 7777:
      //     ElMessage({
      //       message: "拒绝访问",
      //       type: "warning"
      //     }); break;
      //   case 9999:
      //     ElMessage({
      //       message: "未知错误",
      //       type: "warning"
      //     }); break;
      // }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }
)

// 导出
export default instance;