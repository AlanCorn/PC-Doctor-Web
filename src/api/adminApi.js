import request from './request'
import md5 from "md5"

const headers = {
    'Content-Type': 'multipart/form-data'
}

const admin = {
    // 查询全部用户(包括普通用户、电医、管理员)
    getUserList(params) {
        return request.get("/query_user", { params });
    },
    // 添加问题类型
    addProblemCate(params) {
        const form = new FormData();
        form.append('category', params.cate);
        return request.post("/add_category", form, {
            headers
        })
    },
    // 添加问题类型
    deleteProblemCate(params) {
        const form = new FormData();
        form.append('category', params.cate);
        return request.post("/delete_category", form, {
            headers
        })
    },
    // 管理员修改用户身份接口
    userUpdateLevel(params) {
        const form = new FormData();
        form.append('user_id', params.user_id);
        form.append('pwd_md5', md5("123456").toUpperCase());
        return request.post("/update_user", form, {
            headers
        })
    },
    // 管理员修改用户身份接口
    userResetPwd(params) {
        const form = new FormData();
        form.append('user_id', params.user_id);
        form.append('level', params.level);
        return request.post("/update_user", form, {
            headers
        })
    },
    // 管理员删除用户接口
    deleteUser(user_id) {
        const form = new FormData();
        form.append('user_id', user_id);
        return request.post("/delete_user", form, {
            headers
        })
    },
    // 创建文档接口
    addDocument(formData) {
        const form = new FormData();
        form.append('title', formData.title);
        form.append('summary', formData.summary);
        form.append('file', formData.file);
        return request.post("/submit_doc", form, {
            headers
        })
    },
    // 修改/更新文档接口
    updateDocument(formData) {
        const form = new FormData();
        form.append('id', formData.id);
        form.append('title', formData.title);
        form.append('summary', formData.summary);
        form.append('file', formData.file);
        return request.post("/update_doc", form, {
            headers
        })
    },
    // 删除文档接口
    deleteDocument(id) {
        const form = new FormData();
        form.append('id', id);
        return request.post("/delete_doc", form, {
            headers
        })
    },
    /** 更新通知群群号 */
    queryInformGroupID() {
        return request.get("/query_group")
    },
    /** 更新通知群群号
     * @id = 群号
     * */
    updateInformGroupID(id) {
        const form = new FormData();
        form.append('id', id);
        return request.post("/update_group", form, {
            headers
        })
    },
    /** 删除一条预约信息
    *  @orderId=预约id
    * */
    deleteOrder(orderId) {
        const form = new FormData();
        form.append('id', orderId);
        return request.post("/delete", form, {
            headers
        })
    },
}

export default admin