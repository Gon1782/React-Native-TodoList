import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  isEdit: false,
};

const edit = createSlice({
  name: "lists",
  initialState,
  reducers: {
    toggleEdit: (state, action) => {
      state.id = action.payload;
      state.isEdit = !state.isEdit;
    },
    offEdit: (state) => {
      state.id = 0;
      state.isEdit = false;
    },
  },
});

export const { toggleEdit, offEdit } = edit.actions;
export default edit.reducer;
