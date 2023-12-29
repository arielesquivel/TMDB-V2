//Favoritos Store redux
import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorites = createAction("setFavorites");
export const delFavorites = createAction("clearFavorites");

const initialState = {};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      console.log("------------", action.payload);
      return action.payload;
    })
    .addCase(delFavorites, () => {
      console.log("-----------", delFavorites);
      return {};
    });
});

export default favoritesReducer;
