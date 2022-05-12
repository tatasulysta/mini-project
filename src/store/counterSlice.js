import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  subtotal: 0,
  services: 0,
  total: 0,
  items: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value.filter((item) => {
        if (item.id === action.payload) {
          return (item.count += 1);
        }
        return state.value;
      });
    },
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    decrement: (state, action) => {
      state.value.filter((item) => {
        if (item.id === action.payload) {
          return (item.count -= 1);
        }
        return state.value;
      });
    },
    total: (state, action) => {
      state.subtotal = action.payload;
      state.services = state.subtotal * 0.02;
      state.total = state.services + state.subtotal;
    },
    reset: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, add, decrement, reset, total } = counterSlice.actions;

export default counterSlice.reducer;
