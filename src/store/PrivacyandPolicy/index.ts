import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  AllprivacyandPolicy: any; // Store login user data
  userTableData: any; // Store user table data
  singleprivacyandPolicy:any
  singleDevice:any
  groupprivacyandPolicy:any
}

// Initial state for the slice
const initialState: UserDataState = {
  AllprivacyandPolicy: null,
  userTableData: null,
  singleprivacyandPolicy:null,
  singleDevice:null,
  groupprivacyandPolicy:null
};

// Create the user data slice
export const privacyandPolicySlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllprivacyandPolicy: (state, action: PayloadAction<any>) => {
      state.AllprivacyandPolicy = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singleprivacyandPolicy: (state, action: PayloadAction<any>) => {
        state.singleprivacyandPolicy = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      groupprivacyandPolicy: (state, action: PayloadAction<any>) => {
        state.groupprivacyandPolicy = action.payload; // Set user table data
      },
    clearUserData: (state) => {
      state.AllprivacyandPolicy = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {setAllprivacyandPolicy,singleprivacyandPolicy, clearUserData,singleDevices,groupprivacyandPolicy } = privacyandPolicySlice.actions;

// Export reducer
export default privacyandPolicySlice.reducer;
