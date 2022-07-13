import request from './request'
import FormData from 'form-data'
import resolve from "resolve";

const headers = {
    'Content-Type':'multipart/form-data'
}

const fileApi = {
    uploadFile(options){
        console.log()
        const form = new FormData();
        form.append('file',options.file)
        return request.post("/upload", form, {
            headers
        })
    },
}

export default fileApi