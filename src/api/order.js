import request from './request'

const user = {
    getOrderHistory(params){
        console.log(params)
        return request.get("/query",  {params: params});
    },
}


export default user