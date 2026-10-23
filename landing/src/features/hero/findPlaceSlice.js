import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    { id: 3, name: "Holiday Packages", icon: "icon-home" },
    { id: 1, name: "Flights Booking", icon: "icon-tickets" },
    { id: 2, name: "Hotel Booking", icon: "icon-bed" },
   
   
  ],
  currentTab: "Holiday Packages",
};

export const findPlaceSlice = createSlice({
  name: "find-place",
  initialState,
  reducers: {
    addCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
  },
});

export const { addCurrentTab } = findPlaceSlice.actions;
export default findPlaceSlice.reducer;
