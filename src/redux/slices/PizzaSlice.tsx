import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type Pizza, type PizzaState } from '../../@types/Pizzas';
import { fetchPizzass } from './../asyncActions';
import { Status } from '../../@types/types';

const initialState: PizzaState = {
  pizzas: [],
  status: Status.LOADING
};

export const PizzaSlice = createSlice({
  name: 'pizzas',
  initialState,

  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzass.pending, (state, _action) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });

    builder.addCase(fetchPizzass.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzass.rejected, (state, _action) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  }
});
export const { setPizzas } = PizzaSlice.actions;
export default PizzaSlice.reducer;
