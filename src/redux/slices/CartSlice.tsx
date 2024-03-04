import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type PizzaCart, type CartState } from '../../@types/PizzaCart';

const initialState: CartState = {
  totalPrice: 0,
  items: []
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PizzaCart>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      if (findItem !== undefined) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice += action.payload.price;
    },

    minusItem(state, action: PayloadAction<PizzaCart>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      if (findItem !== undefined && findItem.count > 0) {
        findItem.count--;
      }
      // else {
      //   state.items.push(action.payload);
      // }
      state.totalPrice -= action.payload.price;
    },

    removeItem(state, action: PayloadAction<PizzaCart>) {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size
      );
      // }
    },

    clearItems(state, _action: PayloadAction) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const { addItem, removeItem, clearItems, minusItem } = CartSlice.actions;

export default CartSlice.reducer;
