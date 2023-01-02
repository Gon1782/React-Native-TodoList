import { configureStore } from "@reduxjs/toolkit";
import tab from "../modules/tabSlice";
import edit from "../modules/editSlice";

const store = configureStore({
  reducer: { tab, edit },
});

export default store;
