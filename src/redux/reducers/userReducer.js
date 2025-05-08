import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isUser:false,
    user:null,
    users:[],
    loading: false,
  };

export const userReducer = createReducer(initialState,(builder)=>{
    builder
    // load user reducer
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isUser= true;
      state.loading = false;
      state.user= action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // all user reducer
    .addCase("allUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("allUserSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase("allUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    .addCase("clearErrors", (state) => {
        state.error = null;
      });
})