import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import multiPageFormReducer from './multiPageFormSlice';

export const store = configureStore({
  reducer: {
    multiPageForm: multiPageFormReducer,
    hero: findPlaceSlice,
  },
});
