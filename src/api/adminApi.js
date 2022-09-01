import request from './request'

const headers = {
    'Content-Type': 'multipart/form-data'
}

const admin = {
    // 查询全部用户(包括普通用户、电医、管理员)
    getUserList(params) {
        return request.get("/query_user", {params});
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
        form.append('level', params.level);
        return request.post("/update_user", form, {
            headers
        })
    },
    // 管理员删除用户接口
    deleteUser(user_id){
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

}

export default admin