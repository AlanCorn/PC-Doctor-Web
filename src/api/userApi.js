import request from './request'
import md5 from "md5"

const headers = {
    'Content-Type': 'multipart/form-data'
}

const user = {
    getOrderHistory(params) {
        return request.get("/query", {params});
    },
    // 提交预约
    submitOrder(formData) {
        console.log(formData)
        const form = new FormData();
        form.append('problem_description', formData.problem_description);
        form.append('problem_category', formData.problem_category.toString());
        if (formData.problem_picture.length !== 0) {
            form.append('problem_picture', formData.problem_picture.toString());
        }
        return request.post("/submit", form, {
            headers
        })
    },
    // 撤销预约
    withdrawOrder(orderId) {
        const form = new FormData();
        form.append('id', orderId);
        return request.post("/delete", form, {
            headers
        })
    },
    // 添加消息 @todo 接口待更新
    addOrderMessage(params) {
        const form = new FormData();
        form.append('appointment_id', params.id);
        form.append('user_name', params.name);
        form.append('message', params.message);
        if (params.picture !== 0) form.append('picture', params.picture.toString())
        return request.post("/add_message", form, {
            headers
        })
    },
    // 获取消息 @todo 接口待更新
    getOrderStatusMessage(id) {
        return request.get("/query_message", {params: {appointment_id: id}})
    },
    // 登录
    userLogin(params) {
        const form = new FormData();
        form.append('user_id', params.name);
        form.append('pwd_md5', md5(params.password).toUpperCase());
        return request.post("/login", form, {
            headers
        })
    },
    userRegister(params) {
        const form = new FormData();
        form.append('user_id', params.user_id);
        form.append('user_name', params.user_name);
        form.append('contact_details', params.radio + ":" + params.contact_details);
        form.append('pwd_md5', md5(params.password).toUpperCase());
        return request.post("/register", form, {
            headers
        })
    },
    // 通过session_id查询自己的信息 @todo
    queryUser() {
        return request.get("/query_self");
    }
}


export default user