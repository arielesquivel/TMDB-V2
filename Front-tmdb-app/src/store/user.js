//User store
import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("setUser");
export const delUser = createAction("delUser");

//store
const initialState = {};

const reduxUser = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      return { ...state, user: action.payload };
    })
    .addCase(delUser, () => {
      return {};
    });
});

export default reduxUser;
