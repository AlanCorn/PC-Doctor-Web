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
}

export default admin