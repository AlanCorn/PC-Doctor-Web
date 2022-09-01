import {createStore} from "vuex";

import order from './module/order'
import user from './module/user'
import admin from './module/admin'
import doc from './module/doc'

const store = createStore({
    modules:{
        order,
        user,
        admin,
        doc
    },
})

//将store store 导出去
export function myStore() {
    return store;
}
export default store