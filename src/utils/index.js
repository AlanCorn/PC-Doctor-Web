import moment from 'moment';
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


export {
    timeFormatter,
    getImageUrl
}