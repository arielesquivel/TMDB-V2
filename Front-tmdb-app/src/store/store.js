//Store redux
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reduxUser from "./user";
import favoritesReducer from "./favoritos";
const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: reduxUser,
    favoritos: favoritesReducer,
  },
});
export default store;
