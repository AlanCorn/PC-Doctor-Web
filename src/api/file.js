import request from './request'
import FormData from 'form-data'

const headers = {
    'Content-Type':'multipart/form-data'
}


// 文件上传APi @imgType = ['appointment','usr_pic','doc_pic'] ;
const fileApi = {
    uploadFile(file,imgType = 'appointment'){
        const form = new FormData();
        form.append('file',file)
        form.append('type',imgType)
        return request.post("/upload", form, {
            headers
        })
    },
}

export default fileApi