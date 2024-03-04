import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/FilterSlice';
import pizzas from './slices/PizzaSlice';
import cart from './slices/CartSlice';

export const store = configureStore({
  reducer: {
    filter,
    pizzas,
    cart
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
