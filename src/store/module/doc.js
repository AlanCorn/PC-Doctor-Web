import {notify} from "@kyvg/vue3-notification";
import userApi from "@/api/userApi";
import fileApi from "@/api/file";

const doc = {
    state: () => ({
        // 正在处理的文档
        nowDoc:{},
        // 正在处理的文档中的文本内容
        nowDocText:'',
        // 所有文档列表
        docList:[]
    }),
    getters: {
    },
    mutations: {
        setNowDoc(state, doc) {
            state.nowDoc = doc
        },
        setNowDocText(state, text) {
            state.nowDocText = text
        },
        setDocList(state, list) {
            state.docList = list
        },
        offNowDoc(state) {
            state.nowDoc = {}
            state.nowDocText = ""
        }
    },
    actions: {
        // 根据id请求文档
        queryDocById(content, id) {
            // 使用user Api 发送异步请求，提交commit
            new Promise(resolve => {
                userApi.queryDoc({
                    id:id
                }).then(res => {
                    if (res.data.code === 0){
                        content.commit('setNowDoc',res.data.doc_list[0])
                        resolve(res.data.doc_list[0].file)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).then(fileName => {
                fileApi.getPlainTextFile(fileName).then(res =>
                    content.commit('setNowDocText',res.data)
                )
            })
        },
        // 请求文档列表 默认无参数查询全部
        queryDocList(content, params= {}) {
            // 使用user Api 发送异步请求，提交commit
            userApi.queryDoc(params).then(res => {
                if (res.data.code === 0){
                    content.commit('setDocList',res.data.doc_list)
                }
            }).catch(err => {
                console.log(err)
            })
        },
    }
}

export default doc