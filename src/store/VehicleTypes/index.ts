import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  vehicleType: any; // Store login user data
  userTableData: any; // Store user table data
  singlevehicles:any
}

// Initial state for the slice
const initialState: UserDataState = {
  vehicleType: null,
  userTableData: null,
  singlevehicles:null
};

// Create the user data slice
export const subscriberSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setvehicleType: (state, action: PayloadAction<any>) => {
      state.vehicleType = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singlevehicles: (state, action: PayloadAction<any>) => {
        state.singlevehicles = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.vehicleType = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setvehicleType,singlevehicles, clearUserData } = subscriberSlice.actions;

// Export reducer
export default subscriberSlice.reducer;
