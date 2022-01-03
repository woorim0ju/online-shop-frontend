import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

//productsFetch -> action creator
//createAsyncThunk(action type, payload creator -> function, options)
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get("http://localhost:5000/products"); //get(end point)
    return response?.data; //?를 넣으줌으로 data property 없을 경우 에러 대비
  }
);

//reducers와 extraReducers의 차이점
//reducers: action creator 생성과 action type을 핸들링 할때 사용
//extraReducers: action type만 핸들링 함
//이미 action creator가 있다면 extraReducer사용

const productsSlice = createSlice({
  //createSlice로 action, reducer 세팅
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.itmes = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlice.reducer; //reducer export
