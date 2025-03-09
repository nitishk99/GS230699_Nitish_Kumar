import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './slice/storeSclice';
import skuReducer from './slice/skuSlice';
import planningReducer from './slice/planinngSlice';

const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;