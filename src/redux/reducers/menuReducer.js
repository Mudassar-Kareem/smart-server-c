import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    menuItem:null,
    menuItems:[],
    loading: false,
  };

export const menuReducer = createReducer(initialState,(builder)=>{
    builder
    // load menu reducer
    .addCase("LoadMenuRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadMenuSuccess", (state, action) => {
      state.loading = false;
      state.menuItems= action.payload;
    })
    .addCase("LoadMenuFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
        state.error = null;
      });
}
)