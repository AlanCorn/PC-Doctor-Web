import moment from 'moment';
import baseUrl from "../api/urls";
import * as imageConversion from 'image-conversion';
// 编程式路由导航
// function pushRouter(path){
//     router.push(path)
//
const timeFormatter = (datetime, template = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(datetime).format(template)
}
// Vite 下的静态资源获取方法(webpack的require无法使用)
const getImageUrl = (fileName) => {
  return new URL(`../assets/image/vite-images/${fileName}`, import.meta.url).href
}

// 图片压缩方法，默认压缩至1000kb
const imageCompressor = async (file, config = {
  size: 1000,
  type: "image/jpeg",
}) => {
  return new Promise((resolve) => {
    imageConversion.compressAccurately(file, config).then(res => {
      const compressedFile = new File([res], file.name, { type: file.type })
      resolve(compressedFile)
    })
  })
}

// 访问服务器中图片列表  @imgType = ['appointment','user_pic','doc_pic'] ;
const getOnlineImageUrl = (originUrls, imgType = 'appointment') => {
  const urls = []
  if (originUrls) {
    originUrls.split(',').forEach((each) => {
      // urls.push(baseUrl + '/file/' +each)
      urls.push(`${baseUrl.testUrl}file/${imgType}/${each}`)
    })
  }
  return urls
}

// 加载纯文本文件(type=text/plain的File对象)，返回的是Promise对象
async function loadPlainTextFile(file) {
  return await file.text()
}

export {
  timeFormatter,
  getImageUrl,
  getOnlineImageUrl,
  imageCompressor
}