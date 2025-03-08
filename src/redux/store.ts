import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducers/storeReducer'; // Corrected import
import skuReducer from './reducers/skuReducer';     // Corrected import

const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;