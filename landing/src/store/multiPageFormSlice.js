import { createSlice } from "@reduxjs/toolkit";

// Initial state for the form, including destinations, departureDates, seasonalPrices, etc.
const initialState = {
  id: "",
  title: "",
  description: "",
  highlights:[],
  durationDays: 0,
  videoUrl:'',
  childrenPrice:0,
  basePrice: 0,
  durationNights: 0,
  popularityScore: 0,
  difficultyLevel: "",
  ageRestrictions: "",
  languages: "",
  categoryId: "",
  endLocation: "",
  guideInfo:"",
  img:[],
  guideInfo: "",
  departureDates: [],
  seasonalPrices: [
    {
        
        season: "",
        price:0,
        startDate: "",
        endDate: "",
   
      },
  ],
  destinations: [
    {
      name: "",
      country: "",
      description: "",
    },
  ],
  itinerary: [
    {
      day: 1,
      title: "",
      activities: "",
      location: "",
      startTime: "2024-01-01T00:00:00Z",
      endTime: "2024-01-01T00:00:00Z",
      meals: "",
      notes: "",
      img: [],
    },
  ],
  inclusions: [
    {
      description: "",
    },
  ],
  exclusions: [
    {
      description: "",
    },
  ],

  policy: [
    {
      cancellation: "",
      refund: "",
      terms: "",
    },
  ],
  summary: [
    {
      briefDescription: "",
      features: "",
      highlights: "",
    },
  ],
  map: [
    {
      location: "",
      latitude: 0,
      longitude: 0,
    },
  ],
};

const multiPageFormSlice = createSlice({
  name: "multiPageForm",
  initialState,
  reducers: {
    // Action to update any field
    updateField: (state, action) => {
      const { field, value, index } = action.payload;
    
      if (Array.isArray(state[field])) {
        if (index !== undefined) {
          state[field] = state[field].map((item, i) =>
            i === index ? { ...item, ...value } : item
          );
        } else {
          state[field] = value; // Assign the new array directly
        }
      } else {
        state[field] = value;
      }
    },

    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
      
    // Action to reset the form
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm,setFormData } = multiPageFormSlice.actions;

export default multiPageFormSlice.reducer;
