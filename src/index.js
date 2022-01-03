import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit"; //1. configureStore 로 store 생성
import { Provider } from "react-redux"; //2. Provider 감싸주기

import productsReducer, { productsFetch } from "./features/productsSlice";
import { productsApi } from "./features/productsApi";
import cartReducer from "./features/cartSlice";

//configureStore의 2가지 역할
//a. 각각의 reducer들을 combine
//b. redux devtools 자동 생성
const store = configureStore({
  reducer: {
    products: productsReducer, //3. productsReducer 적용
    cart: cartReducer, //cartSlice에서 import 할때 cartReducer로 이름 변경 - reducer 이므로
    [productsApi.reducerPath]: productsApi.reducer, //RTK Query
  },
  //RTK Query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

store.dispatch(productsFetch());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
