import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  uid: "",
};

export const uidSlice = createSlice({
  name: "uid",
  initialState,
  reducers: {
    set: (state, action) => {
      state.uid = action.payload;
    },
  },
});
export const { set } = uidSlice.actions;
export default uidSlice.reducer;
