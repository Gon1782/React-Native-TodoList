import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Javascript",
  onPress: true,
};

const tab = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeTab } = tab.actions;
export default tab.reducer;
