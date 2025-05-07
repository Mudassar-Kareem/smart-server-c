import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { menuReducer } from "./reducers/menuReducer";

const Store = configureStore({
    reducer :{
        user: userReducer,
        menu:menuReducer
    },
})

export default Store;