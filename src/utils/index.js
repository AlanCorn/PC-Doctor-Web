import moment from 'moment';
// 编程式路由导航
// function pushRouter(path){
//     router.push(path)
//
function timeFormatter(datetime){
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss')
}


export {
    timeFormatter
}