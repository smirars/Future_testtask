import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../store/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
