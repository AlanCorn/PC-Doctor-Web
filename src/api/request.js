import axios from 'axios'
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";
import { ElMessage } from "element-plus";
import baseUrl from "./urls";


const store = useStore()
const router = useRouter()


// 创建一个axios实例
const instance = axios.create({
    baseURL: baseUrl.testUrl,
    timeout: 60 * 1000,
    responseType: "json",
})

instance.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem("token");
        if (!config.headers.hasOwnProperty('token') && token) {
            config.headers.token = token;
        }
        //设置axios为form-data 方法2
        // if (config.method === 'post') {
        //     let data = ''
        //     for (let item in config.data) {
        //         if (config.data[item])
        //             data += encodeURIComponent(item) + '=' + encodeURIComponent(config.data[item]) + '&'
        //     }
        //     config.data = data.slice(0, data.length - 1)
        // }
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
            switch (response.data.code) {
                case 4000:
                    ElMessage({
                        message: "处理失败",
                        type: "warning"
                    }); break;
                case 4004:
                    ElMessage({
                        message: "登录失败",
                        type: "warning"
                    }); break;
                case 5000:
                    ElMessage({
                        message: "参数错误",
                        type: "warning"
                    }); break;
                case 7777:
                    ElMessage({
                        message: "拒绝访问",
                        type: "warning"
                    }); break;
                case 9999:
                    ElMessage({
                        message: "未知错误",
                        type: "warning"
                    }); break;
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }
)

// 导出
export default instance;