import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface mapState {
  AllNotification: any; // Store login user data
}

// Initial state for the slice
const initialState: mapState = {
  AllNotification: null,
  
};

// Create the user data slice
export const mapNotification = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setAllNotification: (state, action: PayloadAction<any>) => {
      state.AllNotification = action.payload; // Set login user data
    },
 
  },
});

// Export actions
export const {setAllNotification} = mapNotification.actions;

// Export reducer
export default mapNotification.reducer;
