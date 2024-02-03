import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/products-slice';
import profileReducer from './features/user-profile/profile-slice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
