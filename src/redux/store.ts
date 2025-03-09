import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slice/storeSclice";
import skuReducer from "./slice/skuSlice";

const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
