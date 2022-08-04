import {createStore} from "vuex";

import order from './module/order'
import user from './module/user'

const store = createStore({
    modules:{
        order,
        user
    },
})

//将store store 导出去
export function myStore() {
    return store;
}
export default store