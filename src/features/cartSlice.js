import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  //cartItems: [],
  cartItems: localStorage.getItem("cartItems") //localstorage에 저장된 것이 있으면 사용, 없으면 빈 배열
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      //장바구니 추가하기
      //findIndex 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환, 만족하는 요소가 없으면 -1을 반환합니다.
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        //이미 장바구니에 있다면
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-left",
        });
      } else {
        //장바구니에 없다면
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      //장바구니 삭제하기
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      //장바구니 아이템 개수 감소
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;

        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];

      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // getTotals(state, action) {
    //     state.cartItems.reduce((cartTotal, cartItem) => {
    //         const {price, cartQuantity} =  cartItem;

    //     }, {
    //         total:0,
    //         quantity: 0
    //     } )
    // }
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
