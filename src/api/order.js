import request from './request'

const headers = {
    'Content-Type':'multipart/form-data'
}

const user = {
    getOrderHistory(params){
        return request.get("/query",  {params: params});
    },
    submitOrder(formData){
        console.log(formData)
        const form = new FormData();
        form.append('name',formData.name);
        form.append('contact_details',formData.radio + ":" + formData.contact_details);
        form.append('problem_description',formData.problem_description);
        form.append('problem_category',formData.problem_category.toString());
        if ( formData.problem_picture.length !== 0 ) {
            form.append('problem_picture',formData.problem_picture.toString());
        }
        return request.post("/submit", form, {
            headers
        })
    },
    // 撤销预约
    withdrawOrder(orderId){
        const form = new FormData();
        form.append('id',orderId);
        return request.post("/delete", form, {
            headers
        })
    },
    // 添加消息
    addOrderMessage(params) {
        const form = new FormData();
        form.append('appointment_id', params.id);
        form.append('user_name', params.name);
        form.append('message', params.message);
        if (params.picture !== 0 ) form.append('picture', params.picture.toString())
        return request.post("/add_message", form, {
            headers
        })
    },
    // 获取消息
    getOrderStatusMessage(id){
        return request.get("/query_message",  {params:{ appointment_id:id}})
    },
}


export default user