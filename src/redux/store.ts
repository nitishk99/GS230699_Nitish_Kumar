import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slice/storeSclice";
import skuReducer from "./slice/skuSlice";
import authReducer from './slice/authSlice';

const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
