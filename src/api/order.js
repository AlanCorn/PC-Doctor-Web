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
}


export default user