import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import uidReducer from "./uidSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    uid: uidReducer,
  },
});
