import {createStore} from "vuex";

import order from './module/order'
import user from './module/user'

export default createStore({
    modules:{
        order,
        user
    },
})