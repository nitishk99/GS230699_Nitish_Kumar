import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoreState {
  stores: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  stores: [],
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.stores = action.payload;
    },
  },
});

export const { setStores } = storeSlice.actions;

export default storeSlice.reducer;
