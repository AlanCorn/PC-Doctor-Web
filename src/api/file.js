import request from './request'
import FormData from 'form-data'

const headers = {
    'Content-Type':'multipart/form-data'
}

const fileApi = {
    uploadFile(options){
        const form = new FormData();
        form.append('file',options.file)
        return request.post("/upload", form, {
            headers
        })
    },
}

export default fileApi