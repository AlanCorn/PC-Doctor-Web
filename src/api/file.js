import request from './request'
import FormData from 'form-data'
import baseUrl from './urls'
import { imageCompressor } from "@/utils";

const headers = {
  'Content-Type': 'multipart/form-data'
}


const fileApi = {
  /**  @params fileType = {
       'appointment':用户预约上传的图片,
       'user_pic'：头像,
       'doc_pic'：文档中使用的图片,
       'doc'：文档markdown文件
  } ;
   */
  async uploadFile(file, fileType = 'appointment') {
    // console.log("是否进行压缩", ['appointment', 'user_pic', 'doc_pic'].indexOf(fileType) !== -1)
    // console.log("压缩前文件", file)

    const form = new FormData();
    form.append('type', fileType)
    if (fileType === 'doc') {
      form.append('file', file)
    } else if (['appointment', 'doc_pic'].indexOf(fileType) !== -1) {
      await imageCompressor(file).then(res => {
        form.append('file', res)
        // console.log(`${fileType}压缩后文件`, res)
      })
    } else if (fileType === 'user_pic') {
      await imageCompressor(file, {
        size: 50,
        type: "image/jpeg",
        width: 300,
        height: 300,
      }).then(res => {
        form.append('file', res)
        // console.log(`${fileType}压缩后文件`, res)
      })
    }
    return request.post("/upload", form, {
      headers
    })
  },
  getPlainTextFile(fileName) {
    return request.get(`${baseUrl.testUrl}file/doc/${fileName}`)
  },
}

export default fileApi