import moment from 'moment';
import baseUrl from "../api/urls";
// 编程式路由导航
// function pushRouter(path){
//     router.push(path)
//
const timeFormatter = (datetime) => {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss')
}
// Vite 下的静态资源获取方法(webpack的require无法使用)
const getImageUrl = (fileName) => {
    return new URL(`../assets/image/vite-images/${fileName}`, import.meta.url).href
}

// 访问服务器中图片列表  @imgType = ['appointment','user_pic','doc_pic'] ;
const getOnlineImageUrl = (originUrls,imgType = 'appointment') => {
    const urls = []
    if (originUrls){
        originUrls.split(',').forEach((each) => {
            // urls.push(baseUrl + '/file/' +each)
            urls.push(`${baseUrl.testUrl}file/${imgType}/${each}`)
        })
    }
    return urls
}


export {
    timeFormatter,
    getImageUrl,
    getOnlineImageUrl
}