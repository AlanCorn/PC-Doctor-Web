import {createStore} from "vuex";

import order from './module/order'

export default createStore({
    modules:{
        order
    },
})