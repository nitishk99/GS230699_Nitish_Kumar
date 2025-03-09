import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanningData {
  id: string;
  sku: string;
  store: string;
  price: string;
  cost: string;
  city: string;
  state: string;
  [key: string]: string | number | undefined;
}

interface PlanningState {
  rows: PlanningData[];
}

const initialState: PlanningState = {
  rows: [],
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setPlanningRows: (state, action: PayloadAction<PlanningData[]>) => {
      state.rows = action.payload;
    },
    updatePlanningRow: (state, action: PayloadAction<PlanningData>) => {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
  },
});

export const { setPlanningRows, updatePlanningRow } = planningSlice.actions;

export default planningSlice.reducer;