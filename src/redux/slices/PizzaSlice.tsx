import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type Pizza, type PizzaState } from '../../@types/Pizzas';

const initialState: PizzaState = {
  pizzas: [],
  isLoading: true
};

export const PizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    changeIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    }
  }
});
export const { setPizzas, changeIsLoading } = PizzaSlice.actions;
export default PizzaSlice.reducer;
