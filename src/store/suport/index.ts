import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface suportState {
  Allsuport: any; // Store login user data
 
}

// Initial state for the slice
const initialState: suportState = {
  Allsuport: null,
 
};

// Create the user data slice
export const suportSlice = createSlice({
  name: 'suportData',
  initialState,
  reducers: {
    setAllsuport: (state, action: PayloadAction<any>) => {
      state.Allsuport = action.payload; // Set login user data
    },

  },
});

// Export actions
export const {setAllsuport} = suportSlice.actions;

// Export reducer
export default suportSlice.reducer;
