import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    orders:[],
    loading: false,
  };

export const orderReducer = createReducer(initialState,(builder)=>{
    builder

    .addCase("getOrdersRequest",(state)=>{
        state.loading = true;
    })
    .addCase("getOrdersSuccess",(state,action)=>{
        state.loading = false;
        state.orders = action.payload;
    })
    .addCase("getOrdersFail",(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    })

    .addCase("clearErrors",(state)=>{
        state.error = null;
    })
})


