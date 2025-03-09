import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SkuState {
  skus: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SkuState = {
  skus: [],
  loading: false,
  error: null,
};

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    setSkus: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.skus = action.payload;
    },
  },
});

export const { setSkus } = skuSlice.actions;

export default skuSlice.reducer;
