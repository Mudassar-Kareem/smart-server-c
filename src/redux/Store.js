import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { menuReducer } from "./reducers/menuReducer";
import { orderReducer } from "./reducers/orderReducer";

const Store = configureStore({
    reducer :{
        user: userReducer,
        menu:menuReducer,
        order:orderReducer
    },
})

export default Store;