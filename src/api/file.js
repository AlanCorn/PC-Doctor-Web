import request from './request'
import FormData from 'form-data'
import baseUrl from './urls'

const headers = {
    'Content-Type':'multipart/form-data'
}


// 文件上传APi @imgType = ['appointment','user_pic','doc_pic'] ;
const fileApi = {
    uploadFile(file,imgType = 'appointment'){
        const form = new FormData();
        form.append('file',file)
        form.append('type',imgType)
        return request.post("/upload", form, {
            headers
        })
    },
    getPlainTextFile(fileName){
        return request.get(`${ baseUrl.testUrl }file/doc/${ fileName }`)
    },
}

export default fileApi