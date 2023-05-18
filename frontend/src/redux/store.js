import React from "react";
import { Provider } from "react-redux";
// import { isEmpty } from "../utils/utils"; // new imports
import { configureStore } from "@reduxjs/toolkit";
import api from "./api";

let store;
const Root = ({ children, initialState = {} }, props) => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

  return <Provider store={store}>{children}</Provider>;
};
export { store };
export default Root;
